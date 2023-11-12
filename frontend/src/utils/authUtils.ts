import Cookies from 'js-cookie';

export function getSessionToken(): string | null {
  const token = Cookies.get('SESSION-TOKEN');
  return token ? `Bearer ${token}` : null;
}

export function getXsrfToken(): string {
  let token = Cookies.get('XSRF-TOKEN');
  if (token === undefined) {
    token = crypto.randomUUID();
    Cookies.set('XSRF-TOKEN', token);
  }
  return token;
}

export function removeTokens(): void {
  Cookies.remove('SESSION-TOKEN');
  Cookies.remove('REMEMBER-ME-TOKEN');
}
