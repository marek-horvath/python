def main() -> None:
    names = ["Anna", "Peter", "Lucia"]

    for i in range(len(names)):
        print(i, names[i])

    names = ["Anna", "Peter", "Lucia"]
    points = [82, 67, 91]

    for i in range(len(names)):
        print(names[i], points[i])

    allowed = ["admin", "teacher", "student"]
    role = "teacher"

    found = False
    for item in allowed:
        if item == role:
            found = True

    print(found)

    scores = {"Anna": 82, "Peter": 67, "Lucia": 91}

    for name in scores:
        print(name, scores[name])

    # TODO: Prepíš snippety do Pythonic štýlu.


if __name__ == "__main__":
    main()
