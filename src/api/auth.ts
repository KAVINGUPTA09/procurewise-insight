import { request, setToken, clearToken } from "./client";
import type { CurrentUser } from "./types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type?: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const data = await request<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });
  if (data?.access_token) setToken(data.access_token);
  return data;
}

export async function signup(payload: SignupPayload): Promise<unknown> {
  return request<unknown>("/auth/signup", { method: "POST", body: payload, auth: false });
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return request<CurrentUser>("/auth/me");
}

export function logout() {
  clearToken();
}
