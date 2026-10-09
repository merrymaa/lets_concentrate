from core.security import hash_password
from database.repository_impl import RepositoryImpl
from schemas.auth_dto import JwtRequest, JwtResponse
from core.user_service import UserService

class UserServiceImpl(UserService):
    def __init__(self, repository: RepositoryImpl):
        self.repository = repository

    def register_user(self, email: str, password: str) -> bool:
        if self.repository.get_user_by_email(email):
            return False
        
        hashed_password = hash_password(password)
        
        return self.repository.register_user(email=email, hashed_password=hashed_password)

    def authorize(self, jwt_request: JwtRequest) -> JwtResponse | None:
        user_uuid = self.user_service.authorize(jwt_request.login, jwt_request.password)
        if not user_uuid:
            return None

        access_token = self.jwt_provider.create_access_token(user_uuid)
        refresh_token = self.jwt_provider.create_refresh_token(user_uuid)

        return JwtResponse(
            accessToken=access_token,
            refreshToken=refresh_token)