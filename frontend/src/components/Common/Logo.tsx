import { Link } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps) {
  const mark = (
    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
      AI
    </span>
  )

  const content =
    variant === "responsive" ? (
      <div className={cn("flex items-center gap-2", className)}>
        {mark}
        <span className="text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
          AI Trip
        </span>
      </div>
    ) : variant === "icon" ? (
      mark
    ) : (
      <div className={cn("flex items-center gap-3", className)}>
        {mark}
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight">AI Trip</span>
          <span className="text-xs text-muted-foreground">
            Trip Planning MVP
          </span>
        </div>
      </div>
    )

  if (!asLink) {
    return content
  }

  return <Link to="/">{content}</Link>
}
