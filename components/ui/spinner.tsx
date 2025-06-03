import React from "react";
import { cn } from "@/lib/utils";

export function Spinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <span className="inline-block w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  );
}
