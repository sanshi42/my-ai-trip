from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlalchemy.exc import SQLAlchemyError

from app.api.deps import get_db
from app.core.config import settings
from app.main import app


def test_health_check(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/utils/health-check/")

    assert response.status_code == 200
    assert response.json() is True


def test_health_check_db_unavailable(client: TestClient) -> None:
    class BrokenSession:
        def exec(self, *args: object, **kwargs: object) -> None:
            raise SQLAlchemyError("database unavailable")

    def override_get_db() -> Generator[BrokenSession, None, None]:
        yield BrokenSession()

    app.dependency_overrides[get_db] = override_get_db
    try:
        response = client.get(f"{settings.API_V1_STR}/utils/health-check/")
    finally:
        app.dependency_overrides.pop(get_db, None)

    assert response.status_code == 503
    assert response.json() == {"detail": "Database unavailable"}
