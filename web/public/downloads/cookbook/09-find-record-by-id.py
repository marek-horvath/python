"""Find a student record by its identifier."""

students = {
    "S101": {"name": "Anna", "points": 92},
    "S102": {"name": "Peter", "points": 67},
    "S103": {"name": "Lucia", "points": 84},
}

student_id = "S102"
student = students.get(student_id)

if student is None:
    print(f"Student {student_id} not found")
else:
    print(f"Found: {student['name']} ({student['points']} points)")
