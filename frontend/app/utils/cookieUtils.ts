export function getTokenFromCookiesClient(): string | null {
  const cookieHeader = document.cookie;
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  return tokenMatch ? tokenMatch[1] : null;
}

export function getTokenFromCookiesServer(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) {
    throw new Error("Unauthorized - No cookies found");
  }

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (!token) {
    throw new Error("Unauthorized - Token not found");
  }

  return token;
}
