from fastapi.testclient import TestClient

from app.core.config import settings


def test_create_mock_trip_plan(client: TestClient) -> None:
    payload = {
        "destination": "Tokyo",
        "days": 3,
        "budget": "medium",
        "preferences": ["food", "citywalk", "museum"],
    }

    response = client.post(f"{settings.API_V1_STR}/trip/mock-plan", json=payload)

    assert response.status_code == 200
    content = response.json()
    assert content["destination"] == payload["destination"]
    assert content["days"] == payload["days"]
    assert content["budget"] == payload["budget"]
    assert content["preferences"] == payload["preferences"]
    assert len(content["itinerary"]) == 3
    assert content["itinerary"][0]["day"] == 1
    assert content["itinerary"][1]["day"] == 2
    assert content["itinerary"][2]["day"] == 3
