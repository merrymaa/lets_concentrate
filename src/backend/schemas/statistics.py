from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class StatisticsCreate(BaseModel):
    user: Optional[str] = None  
    session_date: Optional[datetime] = None 
    type_timer: str  
    focus_time_sec: int 
    count_distraction: int 

    
    class Config:
        from_attributes = True