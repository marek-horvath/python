names = ["Eva", "Adam", "Mária", "Peter"]

print(names[1:3])
print(names[::-1])

upper_names = [name.upper() for name in names]
print(upper_names)

for index, name in enumerate(names, start=1):
    print(index, name)

scores = {"Eva": 91, "Adam": 84}
for name, score in scores.items():
    print(name, score)
