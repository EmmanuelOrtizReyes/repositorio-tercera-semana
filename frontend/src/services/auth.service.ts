import api from "./api";
export type User = { id: number; name: string; email: string };
const TOKEN = "dulces_emma_token";
const USER = "dulces_emma_user";
export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post<{ accessToken: string; user: User }>(
      "/auth/login",
      { email, password },
    );
    localStorage.setItem(TOKEN, data.accessToken);
    localStorage.setItem(USER, JSON.stringify(data.user));
    return data.user;
  },
  register(name: string, email: string, password: string) {
    return api.post("/auth/register", { name, email, password });
  },
  logout() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  },
  user(): User | null {
    try {
      return JSON.parse(localStorage.getItem(USER) || "null");
    } catch {
      return null;
    }
  },
  loggedIn() {
    return Boolean(localStorage.getItem(TOKEN));
  },
};
