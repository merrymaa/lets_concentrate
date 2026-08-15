from backend.app.db.repository_impl import RepositoryImpl
from database.database import init_db

class Container:
    def __init__(self):

        self.repository = RepositoryImpl()

container = Container()