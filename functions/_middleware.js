const CANONICAL_HOST = "tripmarking.com";
const REDIRECT_HOSTS = new Set(["www.tripmarking.com"]);

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
