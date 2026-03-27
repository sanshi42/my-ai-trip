import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import { TripService } from "@/client"
import type { TripPlanResponse } from "@/client"

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
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState("")
  const [preferences, setPreferences] = useState("")
  const [result, setResult] = useState<TripPlanResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
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
          preferences: preferences.split(",").map((p) => p.trim()).filter(Boolean),
        },
      })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Trip Planner</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Destination:
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Days:
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10) || 1)}
              min={1}
              max={30}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Budget:
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $1000"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Preferences (comma separated):
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g. food, culture, nature"
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {result && (
        <div>
          <h2>Itinerary for {result.destination}</h2>
          <p>Days: {result.days}</p>
          <p>Budget: {result.budget}</p>
          <p>Preferences: {result.preferences.join(", ")}</p>

          <h3>Daily Plan:</h3>
          {result.itinerary.map((day) => (
            <div key={day.day}>
              <h4>
                Day {day.day}: {day.title}
              </h4>
              <ul>
                {(day.activities ?? []).map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
