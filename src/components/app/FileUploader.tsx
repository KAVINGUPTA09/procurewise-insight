import { useCallback, useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader({
  multiple = false,
  files,
  onChange,
  label,
  hint,
  disabled = false,
}: {
  multiple?: boolean | undefined;
  files: File[];
  onChange: (files: File[]) => void;
  label: string;
  hint?: string | undefined;
  disabled?: boolean | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const accept = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const pdfs = Array.from(incoming).filter(
        (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"),
      );
      if (!pdfs.length) return;
      onChange(multiple ? [...files, ...pdfs] : [pdfs[0] as File]);
    },
    [files, multiple, onChange],
  );

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) accept(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-surface px-6 py-10 text-center transition-colors",
          dragging ? "border-primary bg-accent/60" : "border-border hover:border-primary/50",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
          <UploadCloud className="size-5" />
        </span>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">
          {hint ?? "Drag & drop a PDF here, or click to browse"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple={multiple}
          className="hidden"
          onChange={(event) => {
            accept(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {files.length ? (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border bg-surface px-3 py-2.5 shadow-card"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-destructive/10 text-destructive">
                <FileText className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{file.name}</span>
                <span className="block text-xs text-muted-foreground">{formatSize(file.size)}</span>
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={() => onChange(files.filter((_, i) => i !== index))}
              >
                <X className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
