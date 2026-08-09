const TOKEN_KEY = "procuremind.token";

export const API_BASE_URL = (
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "http://127.0.0.1:8001"
).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler;
}

function friendlyMessage(status: number, payload: unknown): string {
  const detail = (payload as { detail?: unknown; message?: unknown } | null)?.detail;
  const message = (payload as { message?: unknown } | null)?.message;

  if (typeof detail === "string" && detail.trim()) return detail;
  if (typeof message === "string" && message.trim()) return message;

  if (Array.isArray(detail)) {
    const first = detail
      .map((entry) => {
        const e = entry as { loc?: unknown[]; msg?: string };
        const field = Array.isArray(e.loc) ? e.loc.filter((p) => p !== "body").join(".") : "";
        return [field, e.msg].filter(Boolean).join(": ");
      })
      .filter(Boolean);
    if (first.length) return first.join(" · ");
  }

  switch (status) {
    case 400:
      return "The request could not be processed. Please review your input and try again.";
    case 401:
      return "Your session has expired. Please sign in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 413:
      return "The uploaded files are too large.";
    case 422:
      return "Some of the submitted data is invalid. Please check the form and try again.";
    case 500:
    case 502:
    case 503:
      return "The procurement engine hit an unexpected error. Please try again in a moment.";
    default:
      return `Request failed with status ${status}.`;
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true, signal, headers = {} } = options;

  const finalHeaders: Record<string, string> = { Accept: "application/json", ...headers };
  let payload: BodyInit | undefined;

  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  if (auth) {
    const token = getToken();
    if (!token) {
      onUnauthorized?.();
      throw new ApiError(401, "You need to sign in to continue.");
    }
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: payload ?? null,
      signal: signal ?? null,
    });
  } catch {
    throw new ApiError(
      0,
      `Cannot reach the ProcureMind API at ${API_BASE_URL}. Make sure the FastAPI backend is running.`,
    );
  }

  if (response.status === 401) {
    clearToken();
    onUnauthorized?.();
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    const errBody = await parseBody(response);
    throw new ApiError(response.status, friendlyMessage(response.status, errBody), errBody);
  }

  if (response.status === 204) return null as T;
  return (await parseBody(response)) as T;
}

export async function requestBlob(path: string): Promise<Blob> {
  const token = getToken();
  if (!token) {
    onUnauthorized?.();
    throw new ApiError(401, "You need to sign in to continue.");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new ApiError(0, `Cannot reach the ProcureMind API at ${API_BASE_URL}.`);
  }

  if (response.status === 401) {
    clearToken();
    onUnauthorized?.();
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    const errBody = await parseBody(response);
    throw new ApiError(response.status, friendlyMessage(response.status, errBody), errBody);
  }

  return await response.blob();
}
