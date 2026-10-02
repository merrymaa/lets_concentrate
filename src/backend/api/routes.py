from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from schemas.user_register import UserRegister
from di.container import container

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
   




