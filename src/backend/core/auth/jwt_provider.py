import os
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import jwt, JWTError


class JwtProvider:
    def __init__(
        self,
        secret_key_access: str = None,
        secret_key_refresh: str = None,
        algorithm: str = "HS256",
        expire_minutes_access: int = 15,
        expire_days_refresh: int = 7,
    ):
        # Ключи берём из переменных окружения (см. .env),
        # либо используем значения по умолчанию для разработки.
        self.secret_key_access = (
            secret_key_access
            or os.getenv("JWT_SECRET_KEY_ACCESS")
            or "dev-secret-key-access-change-me"
        )
        self.secret_key_refresh = (
            secret_key_refresh
            or os.getenv("JWT_SECRET_KEY_REFRESH")
            or "dev-secret-key-refresh-change-me"
        )
        self.algorithm = algorithm
        self.expire_minutes_access = expire_minutes_access
        self.expire_days_refresh = expire_days_refresh

    def _create_token(self, user_uuid: str, expires_delta: timedelta, key: str, token_type: str) -> str:
        """Внутренний метод для генерации любого токена."""
        now = datetime.now(timezone.utc)
        to_encode = {
            "sub": user_uuid,          # UUID пользователя
            "jti": str(uuid.uuid4()),  # уникальный идентификатор токена
            "type": token_type,        # "access" или "refresh"
            "iat": now,                # время выдачи
            "exp": now + expires_delta,  # время истечения
        }

        return jwt.encode(to_encode, key, algorithm=self.algorithm)

    def create_access_token(self, user_uuid: str) -> str:
        """Создает короткоживущий Access-токен."""
        expires_delta = timedelta(minutes=self.expire_minutes_access)
        return self._create_token(user_uuid, expires_delta, self.secret_key_access, "access")

    def create_refresh_token(self, user_uuid: str) -> str:
        """Создает долгоживущий Refresh-токен."""
        expires_delta = timedelta(days=self.expire_days_refresh)
        return self._create_token(user_uuid, expires_delta, self.secret_key_refresh, "refresh")

    def _validate_token(self, token: str, key: str, expected_type: str) -> bool:
        """Проверяет подпись, срок действия и тип токена."""
        try:
            payload = jwt.decode(token, key, algorithms=[self.algorithm])
            if payload.get("type") != expected_type:
                return False
            sub = payload.get("sub")
            if not sub:
                return False
            # Проверяем, что пользователь с таким UUID существует в БД
            from di.container import container
            if not container.repository.get_user_by_id(sub):
                return False
            return True
        except JWTError:
            return False

    def validate_access_token(self, access_token: str) -> bool:
        """Проверяет валидность Access-токена (подпись, срок действия, тип)."""
        return self._validate_token(access_token, self.secret_key_access, "access")

    def validate_refresh_token(self, refresh_token: str) -> bool:
        """Проверяет валидность Refresh-токена (подпись, срок действия, тип)."""
        return self._validate_token(refresh_token, self.secret_key_refresh, "refresh")

    def get_uuid_from_token(self, token: str) -> Optional[str]:
        """
        Извлекает UUID пользователя из токена БЕЗ проверки подписи/срока действия.
        Это нужно, чтобы выдать понятную ошибку пользователю ("Сессия истекла"),
        а не просто "Невалидный токен".
        """
        try:
            unverified_payload = jwt.get_unverified_claims(token)
            sub = unverified_payload.get("sub")

            # Проверяем формат строки на всякий случай
            if sub and uuid.UUID(sub):
                return str(sub)
            return None
        except Exception:
            return None