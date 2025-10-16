export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const { pathname } = new URL(request.url);
  const allowed = ['jp', 'cn', 'hk', 'us'];
  const country = request.headers.get('x-vercel-ip-country')?.toLowerCase();

  // Allow Vercel Analytics to work
  if (pathname === '/_vercel/insights/script.js') {
      return;
  }

  if (country && !allowed.includes(country)) {
    return new Response(`<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>`, {
      status: 404,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  return;
}