from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import HTMLResponse
from datetime import datetime
from sqlalchemy.orm import Session
from api.dependencies import get_db
from api.auth_dependencies import get_current_user_id
from di.container import container
from schemas.user_register import UserRegister
from schemas.statistics import StatisticsCreate
from schemas.auth_dto import JwtRequest, RefreshJwtRequest
from database.repository_impl import RepositoryImpl

router = APIRouter()


@router.get("/", status_code=200)
def start_page():
    html_content = f"<h2> Hello friend </h2>"
    return HTMLResponse(content=html_content)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister):
    success = container.user_service.register_user(user_data.email, user_data.password)
    if success:
        return {"message": f"{user_data.email} was successful registered"}
    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Login exists",
        )


@router.post("/login", status_code=status.HTTP_200_OK)
def login(jwt_request: JwtRequest):
    """Авторизация: проверяет логин/пароль и возвращает пару JWT-токенов."""
    jwt_response = container.auth_service.authorize(jwt_request)
    if not jwt_response:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid login or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return jwt_response


@router.post("/refresh", status_code=status.HTTP_200_OK)
def refresh(refresh_request: RefreshJwtRequest):
    """Обновление токенов по валидному Refresh-токену."""
    jwt_response = container.auth_service.refresh(refresh_request.refreshToken)
    if not jwt_response:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token is invalid or expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return jwt_response


@router.get("/me", status_code=status.HTTP_200_OK)
def me(current_user_uuid: str = Depends(get_current_user_id)):
    """Возвращает данные текущего пользователя по Access-токену."""
    user = container.repository.get_user_by_id(current_user_uuid)
    return {
        "uuid": user.uuid,
        "email": user.email,
        "data_created": user.data_created,
    }


# Зависимость для получения репозитория
def get_repository(session: Session = Depends(get_db)):
    return RepositoryImpl(session_factory=lambda: session)


@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_statistics(
    stats: StatisticsCreate,
    repository=Depends(get_repository),
    current_user_uuid: str = Depends(get_current_user_id),
):
    """
    Принимает данные о сессии от фронтенда и сохраняет их в БД.
    Требует валидный Access-токен (Authorization: Bearer <token>).
    Привязывает запись к текущему пользователю.
    """
    stats_dict = stats.model_dump()
    stats_dict["user"] = current_user_uuid
    # session_date обязателен в БД — если фронт не прислал дату, ставим текущую
    if not stats_dict.get("session_date"):
        stats_dict["session_date"] = datetime.now()

    success = repository.add_statistics_record(stats_dict)

    if success:
        return {"message": "Statistics record saved successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save statistics record"
        )
