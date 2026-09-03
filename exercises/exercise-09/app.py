from commands import ping_host
from database import find_user
from files import load_file
from tokens import API_KEY, generate_reset_token


def main() -> None:
    name = input("Name: ")
    host = input("Host: ")
    filename = input("Filename: ")

    try:
        user = find_user(name)
        ping_host(host)
        content = load_file(filename)
        token = generate_reset_token()
        print(API_KEY, user, content[:40], token)
    except:
        pass


if __name__ == "__main__":
    main()
