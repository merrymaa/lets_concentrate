from database.repository_impl import RepositoryImpl
from core.user_service_impl import UserServiceImpl
from core.auth_service import AuthService
from core.auth.jwt_provider import JwtProvider
from core.statistic_service import StatisticsService


class Container:
    def __init__(self):
        self.repository = RepositoryImpl()
        self.user_service = UserServiceImpl(self.repository)
        self.jwt_provider = JwtProvider()
        self.auth_service = AuthService(self.user_service, self.jwt_provider)
        self.statistic_service = StatisticsService(self.repository)


container = Container()