import uuid
from datetime import datetime, timedelta
from typing import Optional

from jose import jwt, JWTError

class JWTProvider:
    def __init__(
        self,
        secret_key_access: str,
        secret_key_refresh: str,
        algorithm: str = "HS256",
        expire_minutes_access: int = 15,
        expire_days_refresh: int = 7,
    ):
        self.secret_key_access = secret_key_access
        self.secret_key_refresh = secret_key_refresh
        self.algorithm = algorithm
        self.expire_minutes_access = expire_minutes_access
        self.expire_days_refresh = expire_days_refresh

    def _create_token(self, user_uuid: str, expires_delta: timedelta, key: str) -> str:
        """Внутренний метод для генерации любого токена."""
        to_encode = {"sub": user_uuid}
        
        # Устанавливаем время жизни токена
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        
        return jwt.encode(to_encode, key, algorithm=self.algorithm)

    def create_access_token(self, user_uuid: str) -> str:
        """Создает короткоживущий Access-токен."""
        expires_delta = timedelta(minutes=self.expire_minutes_access)
        return self._create_token(user_uuid, expires_delta, self.secret_key_access)

    def create_refresh_token(self, user_uuid: str) -> str:
        """Создает долгоживущий Refresh-токен."""
        expires_delta = timedelta(days=self.expire_days_refresh)
        return self._create_token(user_uuid, expires_delta, self.secret_key_refresh)

    def validate_access_token(self, access_token: str) -> bool:
        """Проверяет валидность Access-токена (не истек ли срок)."""
        try:
            payload = jwt.decode(access_token, self.secret_key_access, algorithms=[self.algorithm])
            exp = payload.get("exp")
            if not exp or datetime.utcfromtimestamp(exp) < datetime.utcnow():
                return False
            return True
        except JWTError:
            return False

    def validate_refresh_token(self, refresh_token: str) -> bool:
        """Проверяет валидность Refresh-токена."""
        try:
            payload = jwt.decode(refresh_token, self.secret_key_refresh, algorithms=[self.algorithm])
            exp = payload.get("exp")
            if not exp or datetime.utcfromtimestamp(exp) < datetime.utcnow():
                return False
            return True
        except JWTError:
            return False

    def get_uuid_from_token(self, token: str) -> Optional[str]:
        """
        Извлекает UUID пользователя из токена БЕЗ проверки срока действия.
        Это нужно, чтобы выдать понятную ошибку пользователю ("Сессия истекла"), 
        а не просто "Невалидный токен".
        """
        try:
            unverified_payload = jwt.get_unverified_claims(token)
            sub = unverified_payload.get("sub")
            
            # Проверяем формат строки на всякий случай
            if sub and uuid.UUID(sub):
                return sub
            return None
        except Exception:
            return None