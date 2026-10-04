from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from api.dependencies import get_db 
from di.container import container
from schemas.user_register import UserRegister
from schemas.statistics import StatisticsCreate
from database.repository_impl import RepositoryImpl

router = APIRouter()


@router.get("/", status_code=200)
def start_page():
    html_content = f"<h2> Hello friend </h2>"
    return HTMLResponse(content=html_content)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister):
    success = container.auth_service.register_user(user_data.email, user_data.password)
    if success: 
        return {"message": f"{user_data.email} was successful registered"} 
    else: 
        return {"error": "Login exists"}, status.HTTP_409_CONFLICT
   

# Зависимость для получения репозитория
def get_repository(session: Session = Depends(get_db)):
    return RepositoryImpl(session_factory=lambda: session)

@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_statistics(
    stats: StatisticsCreate, 
    repository = Depends(get_repository)
):
    """
    Принимает данные о сессии от фронтенда и сохраняет их в БД.
    """
    stats_dict = stats.model_dump()
    
    success = repository.add_statistics_record(stats_dict)

    if success:
        return {"message": "Statistics record saved successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save statistics record"
        )

