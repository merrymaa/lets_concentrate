from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from di.container import container

# Клиент должен присылать заголовок: Authorization: Bearer <access_token>
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> str:
    """
    Зависимость FastAPI: извлекает UUID пользователя из Bearer Access-токена.
    Бросает 401, если токен отсутствует, невалиден или истёк.
    """
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None or not credentials.credentials:
        raise unauthorized

    access_token = credentials.credentials

    if not container.auth_service.validate_access_token(access_token):
        # Токен мог истечь — дадим понятную подсказку для клиента
        if container.auth_service.get_uuid_from_token(access_token):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        raise unauthorized

    user_uuid = container.auth_service.get_uuid_from_token(access_token)
    if not user_uuid:
        raise unauthorized

    # Проверяем, что пользователь существует в БД
    user = container.repository.get_user_by_id(user_uuid)
    if not user:
        raise unauthorized

    return user_uuid
