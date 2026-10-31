# OOP Quick Reference — Week 4 draft

## Purpose

This is a supplementary draft for the personal seminar project **Python Quick Reference & Best Practices**. It is not a replacement for the course's existing week 4 lecture, which covers testing, debugging and code quality.

## Included content

- class versus object;
- `__init__` and `self`;
- instance attributes, class attributes and methods;
- inheritance and `super()`;
- composition and the difference between “is-a” and “has-a”;
- common mistakes and corrections;
- a small `Book` class practice task with a sample solution;
- runnable example combining `Person`, `Student` and `Course`.

## Website

The page is available at `/oop/` when the Astro site is running. It uses the existing site layout, SK/EN language switcher, copy-code component, print-to-PDF button and responsive styles.

## Run the example

From the repository root:

```powershell
python web/static/downloads/oop-practice.py
```

Expected output:

```text
My name is Anna. Student ID: B123.
Python Basics
Enrolled students: 2
```

## Checks

Before submitting, run `npm.cmd run typecheck`, `npm.cmd run validate`, and `npm.cmd run build` from the repository root. The current course validator may also print pre-existing warnings about missing reference solutions for other exercises; distinguish those from errors introduced by this page.

## Status and review

Working draft for lecturer review. Confirm scope and depth with the lecturer before calling it final teaching material.
