
export async function onRequest(context) {
  const { request, env } = context;

  if (!env.BACKEND_URL) {
    return Response.json(
      {
        success: false,
        message: 'Backend URL is not configured.',
      },
      { status: 503 }
    );
  }

  try {
    const incomingUrl = new URL(request.url);
    const backendUrl = new URL(env.BACKEND_URL);

    if (backendUrl.protocol !== 'https:') {
      throw new Error('Invalid backend protocol');
    }

    backendUrl.pathname = incomingUrl.pathname;
    backendUrl.search = incomingUrl.search;

    const headers = new Headers(request.headers);

    headers.delete('host');

    const response = await fetch(backendUrl.toString(), {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method)
        ? undefined
        : request.body,
      redirect: 'manual',
    });

    if (response.status >= 300 && response.status < 400) {
      return Response.json(
        {
          success: false,
          message: 'Unexpected backend redirect.',
        },
        { status: 502 }
      );
    }

    const responseHeaders = new Headers(response.headers);

    responseHeaders.set('Cache-Control', 'no-store');

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('API proxy failed:', error.message);

    return Response.json(
      {
        success: false,
        message: 'Backend is temporarily unavailable.',
      },
      { status: 502 }
    );
  }
}
