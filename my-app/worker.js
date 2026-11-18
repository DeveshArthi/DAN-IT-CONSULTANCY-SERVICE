
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      try {
        if (!env.BACKEND_URL) {
          console.error('BACKEND_URL is missing');

          return Response.json(
            {
              success: false,
              message: 'Backend URL is not configured.',
            },
            { status: 503 }
          );
        }

        const backendUrl = new URL(env.BACKEND_URL);

        backendUrl.pathname = url.pathname;
        backendUrl.search = url.search;

        const headers = new Headers(request.headers);

        headers.delete('host');
        headers.delete('content-length');

        console.log(
          'Forwarding request:',
          request.method,
          backendUrl.toString()
        );

        const response = await fetch(
          backendUrl.toString(),
          {
            method: request.method,
            headers,
            body:
              request.method === 'GET' ||
              request.method === 'HEAD'
                ? undefined
                : request.body,
            redirect: 'manual',
          }
        );

        console.log(
          'Backend response:',
          response.status
        );

        if (
          response.status >= 300 &&
          response.status < 400
        ) {
          return Response.json(
            {
              success: false,
              message: 'Unexpected backend redirect.',
            },
            { status: 502 }
          );
        }

        const responseHeaders = new Headers(
          response.headers
        );

        responseHeaders.delete('content-length');
        responseHeaders.set('Cache-Control', 'no-store');

        return new Response(response.body, {
          status: response.status,
          headers: responseHeaders,
        });

      } catch (error) {
        console.error(
          'Worker proxy error:',
          error.message
        );

        return Response.json(
          {
            success: false,
            message: 'Unable to connect to backend.',
          },
          { status: 502 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
