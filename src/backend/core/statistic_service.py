from database.repository_impl import RepositoryImpl
from datetime import datetime


class StatisticsService:
    def __init__(self, repository: RepositoryImpl):
        self.repository = repository

    def log_focus_session(self, user_uuid: str, focus_sec: int, distractions: int) -> bool:
        data = {
            "user": str(user_uuid),
            "session_date": datetime.now(),
            "type_timer": "focus",
            "focus_time_sec": focus_sec,
            "count_distraction": distractions
        }
        return self.repository.add_statistics_record(data)