import { Link, useRouterState } from "@tanstack/react-router";

import {
  LayoutDashboard,
  FilePlus2,
  History,
  FileText,
  UserRound,
  LogOut,
  Github,
  Linkedin,
  ExternalLink,
  BadgeInfo,
  Network,
  FlaskConical,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAuth } from "@/lib/auth-context";


// =========================================================
// SOCIAL LINKS
// =========================================================

const GITHUB_URL =
  "https://github.com/KAVINGUPTA09";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/kavin-gupta-509b8a321/";


// =========================================================
// MAIN NAVIGATION
// =========================================================

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Analysis",
    url: "/new-analysis",
    icon: FilePlus2,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/account",
    icon: UserRound,
  },
  {
    title: "Builder",
    url: "/builder",
    icon: BadgeInfo,
  },
  {
    title: "Architecture",
    url: "/architecture",
    icon: Network,
  },
  {
    title: "Sample Demo",
    url: "/sample-analysis",
    icon: FlaskConical,
  },
] as const;


// =========================================================
// SIDEBAR
// =========================================================

export function AppSidebar() {
  const {
    user,
    signOut,
  } = useAuth();

  const pathname =
    useRouterState({
      select: (state) =>
        state.location.pathname,
    });

  return (
    <Sidebar>


      {/* ================================================= */}
      {/* HEADER / BRAND */}
      {/* ================================================= */}

      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">

        <div className="flex items-center gap-3">


          {/* CUSTOM PROJECT LOGO */}

          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_0_28px_rgba(168,85,247,0.25)]">

            <img
              src="/procuremind-logo.png"
              alt="ProcureMind AI Logo"
              className="h-full w-full object-contain"
            />

          </div>


          {/* BRAND TEXT */}

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">

            <p className="truncate text-base font-bold text-sidebar-foreground">
              ProcureMind AI
            </p>

            <p className="truncate text-xs text-sidebar-foreground/60">
              Procurement Intelligence
            </p>

          </div>

        </div>

      </SidebarHeader>


      {/* ================================================= */}
      {/* SIDEBAR CONTENT */}
      {/* ================================================= */}

      <SidebarContent>


        {/* ================================================= */}
        {/* WORKSPACE */}
        {/* ================================================= */}

        <SidebarGroup>

          <SidebarGroupLabel>
            Workspace
          </SidebarGroupLabel>


          <SidebarGroupContent>

            <SidebarMenu>

              {items.map(
                (item) => (

                  <SidebarMenuItem
                    key={item.title}
                  >

                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={
                        pathname === item.url ||
                        pathname.startsWith(
                          `${item.url}/`
                        )
                      }
                    >

                      <Link to={item.url}>

                        <item.icon />

                        <span>
                          {item.title}
                        </span>

                      </Link>

                    </SidebarMenuButton>

                  </SidebarMenuItem>

                )
              )}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>


        {/* ================================================= */}
        {/* CONNECT */}
        {/* ================================================= */}

        <SidebarGroup>

          <SidebarGroupLabel>
            Connect
          </SidebarGroupLabel>


          <SidebarGroupContent>

            <SidebarMenu>


              {/* GitHub */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="GitHub"
                >

                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <Github />

                    <span>
                      GitHub
                    </span>

                    <ExternalLink className="ml-auto size-3 opacity-60 group-data-[collapsible=icon]:hidden" />

                  </a>

                </SidebarMenuButton>

              </SidebarMenuItem>


              {/* LinkedIn */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="LinkedIn"
                >

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <Linkedin />

                    <span>
                      LinkedIn
                    </span>

                    <ExternalLink className="ml-auto size-3 opacity-60 group-data-[collapsible=icon]:hidden" />

                  </a>

                </SidebarMenuButton>

              </SidebarMenuItem>


            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <SidebarFooter className="border-t border-sidebar-border">

        <SidebarMenu>


          {/* USER */}

          <SidebarMenuItem>

            <div className="flex min-w-0 items-center gap-2.5 px-2 py-1.5 group-data-[collapsible=icon]:hidden">

              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">

                {(user?.name ?? "?")
                  .slice(0, 1)
                  .toUpperCase()}

              </span>


              <span className="min-w-0">

                <span className="block truncate text-xs font-medium text-sidebar-foreground">

                  {user?.name ?? "Signed in"}

                </span>


                <span className="block truncate text-[11px] capitalize text-sidebar-foreground/60">

                  {user?.role ?? "user"}

                </span>

              </span>

            </div>

          </SidebarMenuItem>


          {/* LOGOUT */}

          <SidebarMenuItem>

            <SidebarMenuButton
              onClick={signOut}
              tooltip="Logout"
            >

              <LogOut />

              <span>
                Logout
              </span>

            </SidebarMenuButton>

          </SidebarMenuItem>


        </SidebarMenu>

      </SidebarFooter>


    </Sidebar>
  );
}