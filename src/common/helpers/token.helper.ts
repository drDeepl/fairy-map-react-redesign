import { JwtPayload } from "@/features/auth/auth.slice";

export function getTokenLocalStorage(): string | null {
  return localStorage.getItem("accessToken");
}

export function setTokenLocalStorage(accessToken: string): void {
  localStorage.setItem("accessToken", accessToken);
}

export function removeTokenLocalStorage() {
  localStorage.removeItem("accessToken");
}

export function parsePayloadFromAccessToken(accessToken: string): JwtPayload {
  const arrayToken = accessToken.split(".");
  return JSON.parse(atob(arrayToken[1])) as JwtPayload;
}

export function isTokenExpiresValid(exp: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
}

export function checkValidAccessTokenInLocalStorage(): JwtPayload | null {
  const accessToken: string | null = getTokenLocalStorage();
  if (accessToken) {
    return parsePayloadFromAccessToken(accessToken);
  }
  return null;
}
