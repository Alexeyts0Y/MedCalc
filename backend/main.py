from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from APIRouter import api_router
import uvicorn

app = FastAPI()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def main():
    uvicorn.run("main:app", reload=True, port=8000)

if __name__ == "__main__":
    main()