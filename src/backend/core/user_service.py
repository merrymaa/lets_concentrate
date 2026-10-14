from abc import ABC, abstractmethod


class UserService(ABC):

    @abstractmethod
    def register_user(self, email: str, password: str) -> bool:
        """Регистрирует нового пользователя. Возвращает True при успехе."""
        raise NotImplementedError

    @abstractmethod
    def authorize(self, login: str, password: str) -> str | None:
        """Проверяет пару логин/пароль. Возвращает UUID пользователя или None."""
        raise NotImplementedError
