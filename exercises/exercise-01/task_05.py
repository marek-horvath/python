def main() -> None:
    numbers = [-3, -1, 0, 2, 4]
    result = []

    for number in numbers:
        if number > 0:
            result.append(number**2)

    print(result)

    names = ["Anna", "Peter", "Lucia", "Martin", "anna"]

    # TODO: prepíš loop na list comprehension
    # TODO: vytvor set mien v lowercase
    # TODO: vytvor dict name -> počet znakov
    # TODO: vytvor zoznam mien s aspoň 5 znakmi

    rows = [["Anna", "82"], ["Peter", "x"], ["Lucia", "91"]]
    scores = {name: int(points) for name, points in rows if points.isdigit()}
    print(scores)

    # TODO: prepíš scores na čitateľnejší viacriadkový kód


if __name__ == "__main__":
    main()
