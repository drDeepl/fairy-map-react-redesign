export const tokenService = {
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },
  setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  },
};
