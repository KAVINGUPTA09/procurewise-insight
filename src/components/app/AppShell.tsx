import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Loader2,
  Sparkles,
} from "lucide-react";

import { AppSidebar } from "@/components/app/AppSidebar";
import { TopHeader } from "@/components/app/TopHeader";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { useAuth } from "@/lib/auth-context";


export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {

  const { status } = useAuth();

  const navigate =
    useNavigate();


  useEffect(() => {

    if (
      status ===
      "unauthenticated"
    ) {

      void navigate({
        to: "/login",
        replace: true,
      });

    }

  }, [
    status,
    navigate,
  ]);


  if (
    status !==
    "authenticated"
  ) {

    return (

      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background">

        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />


        <div className="relative flex flex-col items-center gap-4">

          <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_35px_rgba(168,85,247,0.20)]">

            <Sparkles className="size-6" />

          </div>


          <div className="flex items-center gap-2 text-sm text-muted-foreground">

            <Loader2 className="size-4 animate-spin text-primary" />

            Loading your procurement workspace…

          </div>

        </div>

      </div>

    );
  }


  return (

    <SidebarProvider>

      <div className="relative flex min-h-screen w-full overflow-hidden bg-background">


        {/* Global ambient background */}

        <div className="pointer-events-none fixed inset-0">

          <div className="absolute -left-32 top-20 size-[420px] rounded-full bg-primary/[0.05] blur-[120px]" />

          <div className="absolute right-0 top-[35%] size-[380px] rounded-full bg-violet-600/[0.04] blur-[130px]" />

        </div>


        <AppSidebar />


        <SidebarInset className="relative min-w-0 bg-transparent">

          <TopHeader
            title={title}
            description={description}
            actions={actions}
          />


          <main className="relative mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

            {children}

          </main>


          <footer className="border-t border-border/40 px-6 py-5">

            <div className="mx-auto flex max-w-[1500px] flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

              <span>
                ProcureMind AI · Agentic Procurement Intelligence
              </span>

              <span>
                LangGraph · FastAPI · PostgreSQL · React
              </span>

            </div>

          </footer>

        </SidebarInset>

      </div>

    </SidebarProvider>
  );
}