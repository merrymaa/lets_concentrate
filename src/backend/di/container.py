from database.repository import Repository

class Container:
    def __init__(self):
        self.repository = Repository()


container = Container()