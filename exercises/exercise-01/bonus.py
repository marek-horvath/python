from task_07 import Result, records


def build_report(results: list[Result]) -> str:
    # TODO: vytvor viacriadkový report podľa zadania bonusu
    raise NotImplementedError


def main() -> None:
    results = [Result(student, course, points) for student, course, points in records]
    print(build_report(results))


if __name__ == "__main__":
    main()
