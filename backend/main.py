from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from APIRouter import api_router
import uvicorn

from db.database import engine, Base
from models.bmi_record import BMIRecord

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

def main():
    uvicorn.run("main:app", reload=True, port=8000, host="0.0.0.0")

if __name__ == "__main__":
    main()