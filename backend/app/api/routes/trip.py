from fastapi import APIRouter

from app.models import ItineraryDay, TripPlanRequest, TripPlanResponse

router = APIRouter(prefix="/trip", tags=["trip"])


@router.post("/mock-plan", response_model=TripPlanResponse)
def create_mock_trip_plan(payload: TripPlanRequest) -> TripPlanResponse:
    return TripPlanResponse(
        destination=payload.destination,
        days=payload.days,
        budget=payload.budget,
        preferences=payload.preferences,
        itinerary=[
            ItineraryDay(
                day=1,
                title="Arrival and City Walk",
                activities=[
                    "Arrive at the destination and check in to your hotel",
                    "Explore a central neighborhood on foot",
                    "Have a casual local dinner nearby",
                ],
            ),
            ItineraryDay(
                day=2,
                title="Landmarks and Local Food",
                activities=[
                    "Visit a major landmark or museum",
                    "Try a popular local lunch spot",
                    "Spend the evening at a scenic viewpoint or market",
                ],
            ),
            ItineraryDay(
                day=3,
                title="Relaxed Morning and Departure",
                activities=[
                    "Enjoy a slow breakfast at a cafe",
                    "Do some light shopping or visit a park",
                    "Head to the airport or station for departure",
                ],
            ),
        ],
    )
