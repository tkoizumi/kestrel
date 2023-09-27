from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette import status
import subprocess

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def root():
    return {"message": "Kestrel api"}

@app.get("/api/monitor/cpu/{function_name}")
def root(function_name:str):
    try:
        result = subprocess.run(["../monitor/build/check_cpu_usage", function_name], stdout=subprocess.PIPE, text=True)
        output = result.stdout
        return output
    except subprocess.CalledProcessError as e:
        return {"error": str(e)}
