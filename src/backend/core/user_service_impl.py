from core.security import hash_password, verify_password
from database.repository_impl import RepositoryImpl
from core.user_service import UserService


class UserServiceImpl(UserService):
    def __init__(self, repository: RepositoryImpl):
        self.repository = repository

    def register_user(self, email: str, password: str) -> bool:
        if self.repository.get_user_by_email(email):
            return False

        hashed_password = hash_password(password)

        return self.repository.register_user(email=email, hashed_password=hashed_password)

    def authorize(self, login: str, password: str) -> str | None:
        """
        Проверяет пару логин(email)/пароль.
        Возвращает UUID пользователя, если данные корректны, иначе None.
        """
        user = self.repository.get_user_by_email(login)
        if not user:
            return None

        if not verify_password(password, user.hashed_password):
            return None

        return user.uuid
