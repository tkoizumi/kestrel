import subprocess


def test(function_name: str):
    print("Testing...")
    try:
        result = subprocess.run(
            ["../monitor/build/check_cpu_usage", function_name], stdout=subprocess.PIPE, text=True)
        output = result.stdout
        return output
    except subprocess.CalledProcessError as e:
        return {"error": str(e)}


print("CPU Usage: ", test("get_usage"))
