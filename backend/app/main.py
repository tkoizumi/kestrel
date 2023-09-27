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

@app.get("/api/monitor/cpu")
def root(q=None):
    result = subprocess.run(["../monitor/build/check_cpu_usage", get_usage], stdout=subprocess.PIPE, text=True)
    output = result.stdout
    return {"message": "CPU Usage: {output}%"}