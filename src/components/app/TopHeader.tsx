import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function TopHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string | undefined;
  actions?: React.ReactNode | undefined;
}) {
  return (
    <header className="sticky top-0 z-20 border-b bg-surface/85 backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="shrink-0" />
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            {description ? (
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
