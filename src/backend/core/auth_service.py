from core.user_service_impl import UserServiceImpl
from core.auth.jwt_provider import JwtProvider
from schemas.auth_dto import JwtRequest, JwtResponse


class AuthService:
    """Сервис авторизации (выдача/проверка JWT)."""

    def __init__(self, user_service: UserServiceImpl, jwt_provider: JwtProvider):
        self.user_service = user_service
        self.jwt_provider = jwt_provider

    def authorize(self, jwt_request: JwtRequest) -> JwtResponse | None:
        """Логины пользователя и возвращает пару токенов (access + refresh)."""
        user_uuid = self.user_service.authorize(jwt_request.login, jwt_request.password)
        if not user_uuid:
            return None

        access_token = self.jwt_provider.create_access_token(user_uuid)
        refresh_token = self.jwt_provider.create_refresh_token(user_uuid)

        return JwtResponse(
            accessToken=access_token,
            refreshToken=refresh_token,
        )

    def refresh(self, refresh_token: str) -> JwtResponse | None:
        """
        Проверяет Refresh-токен и выдаёт новую пару токенов.
        Возвращает None, если refresh-токен невалиден или истёк.
        """
        if not self.validate_refresh_token(refresh_token):
            return None

        user_uuid = self.get_uuid_from_token(refresh_token)
        if not user_uuid:
            return None

        # Убеждаемся, что пользователь всё ещё существует в БД
        if not self.user_service.repository.get_user_by_id(user_uuid):
            return None

        return JwtResponse(
            accessToken=self.jwt_provider.create_access_token(user_uuid),
            refreshToken=self.jwt_provider.create_refresh_token(user_uuid),
        )

    def validate_access_token(self, access_token: str) -> bool:
        """Проверяет валидность Access-токена."""
        return self.jwt_provider.validate_access_token(access_token)

    def validate_refresh_token(self, refresh_token: str) -> bool:
        """Проверяет валидность Refresh-токена."""
        return self.jwt_provider.validate_refresh_token(refresh_token)

    def get_uuid_from_token(self, token: str) -> str | None:
        """Извлекает UUID пользователя из токена (без проверки срока действия)."""
        return self.jwt_provider.get_uuid_from_token(token)
