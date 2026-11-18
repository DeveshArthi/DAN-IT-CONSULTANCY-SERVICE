
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Forward API requests to Render
    if (url.pathname.startsWith('/api/')) {
      try {
        const backendUrl = new URL(
          env.BACKEND_URL
        );

        backendUrl.pathname = url.pathname;
        backendUrl.search = url.search;

        const headers = new Headers(request.headers);
        headers.delete('host');

        const response = await fetch(
          backendUrl.toString(),
          {
            method: request.method,
            headers,
            body: ['GET', 'HEAD'].includes(request.method)
              ? undefined
              : request.body,
            redirect: 'manual',
          }
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

        responseHeaders.set(
          'Cache-Control',
          'no-store'
        );

        return new Response(response.body, {
          status: response.status,
          headers: responseHeaders,
        });

      } catch (error) {
        console.error('Backend proxy failed:', error.message);

        return Response.json(
          {
            success: false,
            message: 'Backend temporarily unavailable.',
          },
          { status: 502 }
        );
      }
    }

    // Serve React frontend
    return env.ASSETS.fetch(request);
  },
};
