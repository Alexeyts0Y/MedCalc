from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello, World!"}

def main():
    uvicorn.run("main:app", reload=True)

if __name__ == "__main__":
    main()