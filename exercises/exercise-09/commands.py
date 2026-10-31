from pathlib import Path
import subprocess
import sys

WORKER = Path(__file__).resolve().with_name("badge_worker.py")


def create_badge(name: str) -> str:
    command = f'"{sys.executable}" "{WORKER}" --name "{name}"'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout
