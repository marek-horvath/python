import argparse
import json


def main() -> None:
    parser = argparse.ArgumentParser(description="Harmless local badge fixture")
    parser.add_argument("--name", required=True)
    args = parser.parse_args()
    print(json.dumps({"name": args.name, "kind": "volunteer"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
