
# from core.security import hash_password
# from database.repository_impl import RepositoryImpl
# from schemas.auth_dto import JwtRequest, JwtResponse
from core.user_service_impl import UserServiceImpl
from core.auth.jwt_provider import JwtProvider
from schemas.auth_dto import JwtRequest, JwtResponse

class AuthService:
    """"Сервис авторизации"""

    def __init__(self):
        self.user_service = UserServiceImpl()
        self.jwt_provider = JwtProvider()

    def authorize(self, jwt_request: JwtRequest) -> JwtResponse | None:

        user_uuid = self.user_service.authorize(jwt_request.login, jwt_request.password)
        if not user_uuid:
            return None

        access_token = self.jwt_provider.create_access_token(user_uuid)
        refresh_token = self.jwt_provider.create_refresh_token(user_uuid)

        return JwtResponse(
            accessToken=access_token,
            refreshToken=refresh_token)


    #TODO  def validate_access_token(access_token: str) -> bool:
    #TODO  def validate_refresh_token(refresh_token: str) -> bool:
    #TODO def get_uuid_from_token(token: str) -> str | None:
    