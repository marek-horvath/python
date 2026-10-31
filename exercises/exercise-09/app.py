import argparse

from commands import create_badge
from database import create_volunteer, initialize_demo_database
from tokens import API_KEY, generate_invitation_token


def validate_application(name, email, hours):
    raise NotImplementedError("Define the application input contract.")


def process_application(name, email, hours, owner_id):
    validate_application(name, email, hours)
    try:
        volunteer_id = create_volunteer(name, email, hours, owner_id)
        create_badge(name)
        token = generate_invitation_token()
        print(API_KEY, email, token)
        return volunteer_id, token
    except Exception:
        pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Local volunteer registration exercise")
    parser.add_argument("--init-demo", action="store_true")
    args = parser.parse_args()
    if args.init_demo:
        initialize_demo_database()
        print("Fictional demo database initialized.")
    else:
        print("Operations: application validation, registration, attachments, badges, invitations.")
        print("Read the worksheet and source files before implementing the operations.")


if __name__ == "__main__":
    main()
