import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";

import { getCurrentUser, logout as clearSession } from "@/api/auth";
import { clearToken, getToken, setUnauthorizedHandler } from "@/api/client";
import type { CurrentUser } from "@/api/types";

interface AuthContextValue {
  user: CurrentUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  refresh: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }
    try {
      const profile = await getCurrentUser();
      setUser(profile);
      setStatus("authenticated");
    } catch {
      clearToken();
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
    setStatus("unauthenticated");
    void router.navigate({ to: "/login", replace: true });
  }, [router]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setStatus("unauthenticated");
      void router.navigate({ to: "/login", replace: true });
    });
    return () => setUnauthorizedHandler(null);
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, refresh, signOut }),
    [user, status, refresh, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
