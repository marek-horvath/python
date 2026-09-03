import subprocess


def ping_host(host: str) -> int:
    result = subprocess.run(
        f"ping {host}",
        shell=True,
    )
    return result.returncode
