import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import {
  Loader2,
  ShieldCheck,
} from "lucide-react";

import {
  googleLogin,
  login,
} from "@/api/auth";

import { ApiError } from "@/api/client";

import { GoogleSignInButton } from "@/components/GoogleSignbutton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/lib/auth-context";


export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Sign in — ProcureMind AI",
      },
      {
        name: "description",
        content:
          "Sign in to ProcureMind AI to compare vendor quotations and review AI procurement recommendations.",
      },
    ],
  }),
  component: LoginPage,
});


function AuthAside() {
  return (
    <aside className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">

      <div className="flex items-center gap-2.5">

        <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShieldCheck className="size-5" />
        </span>

        <span className="text-sm font-semibold">
          ProcureMind AI
        </span>

      </div>

      <div className="max-w-md">

        <h2 className="text-3xl font-semibold tracking-tight">
          Smarter Procurement. Faster Decisions.
        </h2>

        <p className="mt-4 text-sm text-sidebar-foreground/70">
          Compare vendors, evaluate compliance, and generate AI-assisted
          procurement recommendations.
        </p>

      </div>

      <p className="text-xs text-sidebar-foreground/50">
        Enterprise procurement decision support.
      </p>

    </aside>
  );
}


function LoginPage() {

  const navigate = useNavigate();

  const {
    refresh,
    status,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [pending, setPending] =
    useState(false);

  const [googlePending, setGooglePending] =
    useState(false);


  useEffect(() => {

    if (status === "authenticated") {

      void navigate({
        to: "/dashboard",
        replace: true,
      });

    }

  }, [status, navigate]);


  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault();

    setError(null);

    if (!email.trim() || !password) {

      setError(
        "Enter your email and password to continue.",
      );

      return;
    }

    setPending(true);

    try {

      await login({
        email: email.trim(),
        password,
      });

      await refresh();

      await navigate({
        to: "/dashboard",
        replace: true,
      });

    } catch (caught) {

      setError(

        caught instanceof ApiError

          ? caught.status === 401

            ? "Incorrect email or password."

            : caught.message

          : "We couldn't reach the procurement service. Please try again.",

      );

    } finally {

      setPending(false);

    }
  }


  const handleGoogleCredential =
    useCallback(

      async (
        credential: string,
      ) => {

        setError(null);

        setGooglePending(true);

        try {

          await googleLogin(
            credential,
          );

          await refresh();

          await navigate({
            to: "/dashboard",
            replace: true,
          });

        } catch (caught) {

          setError(

            caught instanceof ApiError

              ? caught.message

              : "Google sign-in could not be completed.",

          );

        } finally {

          setGooglePending(false);

        }

      },

      [
        refresh,
        navigate,
      ],
    );


  return (

    <div className="grid min-h-screen bg-background lg:grid-cols-2">

      <AuthAside />

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">

        <div className="w-full max-w-sm">

          <div className="flex items-center gap-2.5 lg:hidden">

            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>

            <span className="text-sm font-semibold">
              ProcureMind AI
            </span>

          </div>

          <h1 className="mt-8 text-2xl font-semibold tracking-tight lg:mt-0">
            Sign in
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Access your procurement intelligence dashboard.
          </p>


          {/* GOOGLE LOGIN */}

          <div className="mt-8">

            {googlePending ? (

              <div className="flex h-11 items-center justify-center gap-2 rounded-md border text-sm text-muted-foreground">

                <Loader2 className="size-4 animate-spin" />

                Signing in with Google…

              </div>

            ) : (

              <GoogleSignInButton />

            )}

          </div>


          {/* DIVIDER */}

          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-border" />

            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-border" />

          </div>


          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="space-y-1.5">

              <Label htmlFor="email">
                Work email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={
                  pending ||
                  googlePending
                }
              />

            </div>


            <div className="space-y-1.5">

              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={
                  pending ||
                  googlePending
                }
              />

            </div>


            {error ? (

              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>

            ) : null}


            <Button
              type="submit"
              className="w-full"
              disabled={
                pending ||
                googlePending
              }
            >

              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}

              {pending
                ? "Signing in…"
                : "Sign in"}

            </Button>

          </form>


          <p className="mt-6 text-sm text-muted-foreground">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}