from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse, Response
from backend.di.container import container



router = APIRouter()

@router.get("/test", status_code=200)
def start_page():
    html_content = f"<h2> Hello friend </h2>"

   


    return HTMLResponse(content=html_content)

