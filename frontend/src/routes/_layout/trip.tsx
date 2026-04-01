import { createFileRoute } from "@tanstack/react-router"
import { type FormEvent, useMemo, useState } from "react"
import type { TripPlanResponse } from "@/client"
import { TripService } from "@/client"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const Route = createFileRoute("/_layout/trip")({
  component: TripPage,
  head: () => ({
    meta: [
      {
        title: "Trip Planner - AI Trip",
      },
    ],
  }),
})

function TripPage() {
  const { t } = useLocale()
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState("")
  const [preferences, setPreferences] = useState("")
  const [result, setResult] = useState<TripPlanResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const preferencesList = useMemo(
    () =>
      preferences
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [preferences],
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const data: TripPlanResponse = await TripService.createMockTripPlan({
        requestBody: {
          destination,
          days,
          budget,
          preferences: preferencesList,
        },
      })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.unknownError"))
    } finally {
      setLoading(false)
    }
  }

  const preferenceSummary =
    result && result.preferences.length > 0
      ? result.preferences.join(", ")
      : t("trip.noPreferences")

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_1fr]">
      <Card>
        <CardHeader>
          <CardDescription>{t("trip.badge")}</CardDescription>
          <CardTitle className="text-2xl">{t("trip.heading")}</CardTitle>
          <CardDescription>{t("trip.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              className="block text-sm font-medium"
              htmlFor="trip-destination"
            >
              {t("trip.destinationLabel")}
              <Input
                id="trip-destination"
                className="mt-2"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t("trip.destinationPlaceholder")}
                required
              />
            </label>

            <label className="block text-sm font-medium" htmlFor="trip-days">
              {t("trip.daysLabel")}
              <Input
                id="trip-days"
                className="mt-2"
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10) || 1)}
                min={1}
                max={30}
                required
              />
            </label>

            <label className="block text-sm font-medium" htmlFor="trip-budget">
              {t("trip.budgetLabel")}
              <Input
                id="trip-budget"
                className="mt-2"
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={t("trip.budgetPlaceholder")}
                required
              />
            </label>

            <label
              className="block text-sm font-medium"
              htmlFor="trip-preferences"
            >
              {t("trip.preferencesLabel")}
              <Input
                id="trip-preferences"
                className="mt-2"
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder={t("trip.preferencesPlaceholder")}
              />
            </label>

            <p className="text-sm text-muted-foreground">
              {t("trip.preferencesHelp")}
            </p>

            {error && (
              <p className="text-sm text-destructive">
                {t("trip.errorPrefix")}: {error}
              </p>
            )}

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? t("trip.submitting") : t("trip.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {result
              ? t("trip.resultTitle", { destination: result.destination })
              : t("trip.emptyTitle")}
          </CardTitle>
          <CardDescription>
            {result ? t("trip.dailyPlan") : t("trip.emptyDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {result ? (
            <>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    {t("trip.summaryDays")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{result.days}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    {t("trip.summaryBudget")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{result.budget}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    {t("trip.summaryPreferences")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {preferenceSummary}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {result.itinerary.map((day) => (
                  <div key={day.day} className="rounded-lg border p-4">
                    <h3 className="font-semibold">
                      {t("trip.dayTitle", { day: day.day })}: {day.title}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {(day.activities ?? []).map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              {t("trip.emptyDescription")}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
