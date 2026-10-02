from database.repository_impl import RepositoryImpl
from core.auth_service import AuthService

class Container:
    def __init__(self):
        self.repository = RepositoryImpl()
        self.auth_service = AuthService(self.repository)


container = Container()