def add_student(name, students=[]):
    students.append(name)
    return students


def normalize_names(names: list[str]) -> list[str]:
    # TODO: vráť mená vo formáte Anna, Peter, Lucia
    raise NotImplementedError


def passing_scores(scores: dict[str, int], minimum: int = 51) -> list[str]:
    # TODO: vráť mená študentov, ktorí majú aspoň minimum bodov
    raise NotImplementedError


def main() -> None:
    print(add_student("Anna"))
    print(add_student("Peter"))

    print(normalize_names([" Anna ", "PETER", "lucia"]))
    print(passing_scores({"Anna": 82, "Peter": 45, "Lucia": 91}))


if __name__ == "__main__":
    main()
