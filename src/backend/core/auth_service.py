
# from app.core.security import hash_password
# from app.db.repository_impl import RepositoryImpl
from core.security import hash_password
from database.repository_impl import RepositoryImpl

class AuthService:
    def __init__(self, repository: RepositoryImpl):
        self.repository = repository

    def register_user(self, email: str, password: str) -> bool:
        if self.repository.get_user_by_email(email):
            return False
        
        hashed_password = hash_password(password)
        
        return self.repository.register_user(email=email, hashed_password=hashed_password)
