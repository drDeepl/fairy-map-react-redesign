import { JwtPayload } from "@/features/auth/authSlice";

export function getUserLocalStorage(): JwtPayload | null {
  const accessToken: string | null = localStorage.getItem("accessToken");

  return accessToken ? parseUserFromAccessToken(accessToken) : null;
}

export function setTokenLocalStorage(accessToken: string): void {
  localStorage.setItem("accessToken", accessToken);
}

export function parseUserFromAccessToken(accessToken: string): JwtPayload {
  const arrayToken = accessToken.split(".");
  return JSON.parse(atob(arrayToken[1])) as JwtPayload;
}
