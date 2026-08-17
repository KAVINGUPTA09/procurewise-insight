import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BadgeInfo,
  FilePlus2,
  FileText,
  FileSignature,
  FlaskConical,
  Github,
  History,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Network,
  ShieldCheck,
  UserRound,
  UsersRound,
  ExternalLink,
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

const GITHUB_URL = "https://github.com/KAVINGUPTA09";
const LINKEDIN_URL = "https://www.linkedin.com/in/kavin-gupta-509b8a321/";

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const role = (user?.role ?? "buyer").toLowerCase();

  const dashboardUrl = role === "admin" ? "/admin-dashboard" : role === "approver" ? "/approver-dashboard" : "/dashboard";
  const items = [
    { title: "Dashboard", url: dashboardUrl, icon: LayoutDashboard, roles: ["buyer", "approver", "admin"] },
    { title: "New Analysis", url: "/new-analysis", icon: FilePlus2, roles: ["buyer", "admin"] },
    { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ["buyer", "approver", "admin"] },
    { title: "Approvals", url: "/approver-dashboard", icon: ShieldCheck, roles: ["approver", "admin"] },
    { title: "Contracts", url: "/contracts", icon: FileSignature, roles: ["buyer", "approver", "admin"] },
    { title: "Admin Console", url: "/admin-dashboard", icon: UsersRound, roles: ["admin"] },
    { title: "History", url: "/history", icon: History, roles: ["buyer", "admin"] },
    { title: "Reports", url: "/reports", icon: FileText, roles: ["buyer", "approver", "admin"] },
    { title: "Profile", url: "/account", icon: UserRound, roles: ["buyer", "approver", "admin"] },
    { title: "Builder", url: "/builder", icon: BadgeInfo, roles: ["buyer", "approver", "admin"] },
    { title: "Architecture", url: "/architecture", icon: Network, roles: ["buyer", "approver", "admin"] },
    { title: "Sample Demo", url: "/sample-analysis", icon: FlaskConical, roles: ["buyer", "approver", "admin"] },
  ].filter((item) => item.roles.includes(role));

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_0_28px_rgba(168,85,247,0.25)]">
            <img src="/procuremind-logo.png" alt="ProcureMind AI Logo" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-base font-bold text-sidebar-foreground">ProcureMind AI</p>
            <p className="truncate text-xs text-sidebar-foreground/60">B2B Procurement Intelligence</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace · {role}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)}>
                    <Link to={item.url as never}><item.icon /><span>{item.title}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Connect</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton asChild tooltip="GitHub"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github /><span>GitHub</span><ExternalLink className="ml-auto size-3 opacity-60 group-data-[collapsible=icon]:hidden" /></a></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton asChild tooltip="LinkedIn"><a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin /><span>LinkedIn</span><ExternalLink className="ml-auto size-3 opacity-60 group-data-[collapsible=icon]:hidden" /></a></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex min-w-0 items-center gap-2.5 px-2 py-1.5 group-data-[collapsible=icon]:hidden">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">{(user?.name ?? "?").slice(0,1).toUpperCase()}</span>
              <span className="min-w-0"><span className="block truncate text-xs font-medium text-sidebar-foreground">{user?.name ?? "Signed in"}</span><span className="block truncate text-[11px] capitalize text-sidebar-foreground/60">{role}</span></span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton onClick={signOut} tooltip="Logout"><LogOut /><span>Logout</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
