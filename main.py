from fastapi import FastAPI
from APIRouter import api_router
import uvicorn

app = FastAPI()

app.include_router(api_router)

def main():
    uvicorn.run("main:app", reload=True)

if __name__ == "__main__":
    main()