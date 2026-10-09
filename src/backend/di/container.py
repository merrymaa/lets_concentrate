from database.repository_impl import RepositoryImpl
# from core.auth_service import AuthService
from core.user_service_impl import UserServiceImpl
from core.statistic_service import StatisticsService

class Container:
    def __init__(self):
        self.repository = RepositoryImpl()
        self.auth_service = UserServiceImpl(self.repository)
        self.statistic_service = StatisticsService(self.repository)


container = Container()