export const config = {
  matcher: '/(.*)',
};
 
export default function middleware(request) {
  const allowed = ['jp', 'cn', 'hk', 'us'];
  const country = request.headers.get('x-vercel-ip-country')?.toLowerCase();
 
  if (country && !allowed.includes(country)) {
    return new Response('404 Not Found', {
      status: 404,
    });
  }
}
