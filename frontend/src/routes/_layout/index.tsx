import { createFileRoute, Link as RouterLink } from "@tanstack/react-router"

import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
  head: () => ({
    meta: [
      {
        title: "Home - AI Trip",
      },
    ],
  }),
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const { t } = useLocale()
  const displayName =
    currentUser?.full_name || currentUser?.email || t("user.fallbackName")

  return (
    <div className="flex flex-col gap-6" data-testid="home-overview">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("home.badge")}
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight">
          {t("home.heading")}
        </h1>
        <p className="text-muted-foreground">
          {t("home.greeting", { name: displayName })}
        </p>
        <p className="max-w-2xl text-muted-foreground" data-testid="home-intro">
          {t("home.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("home.overviewTitle")}</CardTitle>
            <CardDescription>{t("home.overviewDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <RouterLink to="/trip">{t("home.primaryAction")}</RouterLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("home.scopeTitle")}</CardTitle>
            <CardDescription>{t("home.scopeDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{t("home.helperTitle")}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("home.helperItem1")}</li>
              <li>{t("home.helperItem2")}</li>
              <li>{t("home.helperItem3")}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
