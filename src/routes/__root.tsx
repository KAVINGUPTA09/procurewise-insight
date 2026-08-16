import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import {
  ArrowLeft,
  Home,
  RefreshCcw,
  SearchX,
  TriangleAlert,
} from "lucide-react";

import {
  useEffect,
  type ReactNode,
} from "react";

import appCss from "../styles.css?url";

import {
  reportLovableError,
} from "../lib/lovable-error-reporting";

import {
  AuthProvider,
} from "../lib/auth-context";

import {
  Toaster,
} from "../components/ui/sonner";


// =========================================================
// CUSTOM 404 PAGE
// =========================================================

function NotFoundComponent() {

  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">


      {/* Ambient glows */}

      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 size-[320px] rounded-full bg-violet-600/10 blur-[110px]" />


      <div className="relative w-full max-w-2xl">


        <div className="rounded-3xl border border-primary/30 bg-card/90 p-8 text-center shadow-lift backdrop-blur-xl sm:p-12">


          {/* Logo */}

          <div className="mx-auto flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_0_35px_rgba(168,85,247,0.25)]">

            <img
              src="/procuremind-logo.png"
              alt="ProcureMind AI Logo"
              className="h-full w-full object-contain"
            />

          </div>


          {/* 404 */}

          <div className="mt-7">

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">

              <SearchX className="size-3.5" />

              Route not found

            </div>


            <h1 className="mt-5 bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">

              404

            </h1>


            <h2 className="mt-4 text-2xl font-bold tracking-tight">

              This procurement route doesn't exist

            </h2>


            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">

              The page you're looking for may have been moved,
              removed, or the URL may be incorrect.

              Return to ProcureMind and continue your procurement workflow.

            </p>

          </div>


          {/* Actions */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >

              <Home className="size-4" />

              Go Home

            </Link>


            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-accent"
            >

              <ArrowLeft className="size-4" />

              Dashboard

            </Link>

          </div>


          <p className="mt-8 text-xs text-muted-foreground">

            ProcureMind AI · Agentic Procurement Intelligence

          </p>

        </div>

      </div>

    </div>
  );
}


// =========================================================
// GLOBAL ERROR PAGE
// =========================================================

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  console.error(error);

  const router =
    useRouter();


  useEffect(() => {

    reportLovableError(
      error,
      {
        boundary:
          "tanstack_root_error_component",
      }
    );

  }, [error]);


  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">


      {/* Background glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[130px]" />


      <div className="relative w-full max-w-xl">

        <div className="rounded-3xl border border-destructive/25 bg-card/90 p-8 text-center shadow-lift backdrop-blur-xl sm:p-10">


          {/* Logo */}

          <div className="mx-auto flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-[0_0_30px_rgba(168,85,247,0.18)]">

            <img
              src="/procuremind-logo.png"
              alt="ProcureMind AI Logo"
              className="h-full w-full object-contain"
            />

          </div>


          {/* Error icon */}

          <div className="mx-auto mt-6 flex size-12 items-center justify-center rounded-xl border border-destructive/25 bg-destructive/10 text-destructive">

            <TriangleAlert className="size-5" />

          </div>


          <h1 className="mt-5 text-2xl font-bold tracking-tight">

            This page didn't load

          </h1>


          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">

            Something unexpected happened while loading this
            ProcureMind page.

            You can try again or return to the home page.

          </p>


          {/* Buttons */}

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <button
              onClick={() => {

                router.invalidate();

                reset();

              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >

              <RefreshCcw className="size-4" />

              Try Again

            </button>


            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-accent"
            >

              <Home className="size-4" />

              Go Home

            </a>

          </div>

        </div>

      </div>

    </div>
  );
}


// =========================================================
// ROOT ROUTE
// =========================================================

export const Route =
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({

    head: () => ({

      meta: [

        {
          charSet: "utf-8",
        },

        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1",
        },

        {
          title:
            "ProcureMind AI — AI Procurement Intelligence",
        },

        {
          name: "description",
          content:
            "Compare vendors, evaluate compliance and generate AI-assisted procurement recommendations.",
        },

        {
          property: "og:type",
          content: "website",
        },

        {
          property: "og:title",
          content:
            "ProcureMind AI — Agentic Procurement Intelligence",
        },

        {
          property: "og:description",
          content:
            "AI-powered procurement intelligence with vendor scoring, compliance validation and LangGraph orchestration.",
        },

        {
          name: "twitter:card",
          content:
            "summary_large_image",
        },

      ],


      links: [

        {
          rel: "stylesheet",
          href: appCss,
        },

        {
          rel: "preconnect",
          href:
            "https://fonts.googleapis.com",
        },

        {
          rel: "preconnect",
          href:
            "https://fonts.gstatic.com",
          crossOrigin:
            "anonymous",
        },

        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },


        // =================================================
        // PROJECT LOGO AS FAVICON
        // =================================================

        {
          rel: "icon",
          href:
            "/procuremind-logo.png",
          type:
            "image/png",
        },


        {
          rel:
            "apple-touch-icon",
          href:
            "/procuremind-logo.png",
        },

      ],
    }),


    shellComponent:
      RootShell,


    component:
      RootComponent,


    notFoundComponent:
      NotFoundComponent,


    errorComponent:
      ErrorComponent,

  });


// =========================================================
// ROOT HTML SHELL
// =========================================================

function RootShell({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <html lang="en">

      <head>

        <HeadContent />

      </head>


      <body>

        {children}

        <Scripts />

      </body>

    </html>
  );
}


// =========================================================
// ROOT APP PROVIDERS
// =========================================================

function RootComponent() {

  const {
    queryClient,
  } =
    Route.useRouteContext();


  return (

    <QueryClientProvider
      client={queryClient}
    >

      <AuthProvider>


        {/* Nested routes render here */}

        <Outlet />


        {/* Toast Notifications */}

        <Toaster />


      </AuthProvider>

    </QueryClientProvider>
  );
}