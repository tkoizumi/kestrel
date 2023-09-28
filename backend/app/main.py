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
def root(function_name: str):
    path = "../monitor/build/check_cpu_usage"
    #result = subprocess.run([path, function_name],stdout=subprocess.PIPE, text=True)
    result = subprocess.run(["ls","./monitor/build"], stdout=subprocess.PIPE, text=True)

    # Print the output of the 'ls' command
    # print("Output of 'cd monitor && ls' command:")
    return result.stdout
