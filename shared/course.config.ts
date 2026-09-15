export const courseConfig = {
  title: "Programovanie v Pythone",
  code: "programovanie-v-pythone",
  university: "Technická univerzita v Košiciach",
  faculty: "Fakulta elektrotechniky a informatiky",
  programme: "Aplikovaná informatika",
  studyYear: "2. ročník",
  language: "slovenčina",
  lectureLength: "50-60 minút",
  mainTeachingWeeks: 10,
  currentWeek: 1,
  unlockAll: true,
  timezone: "Europe/Bratislava",
  adminPreviewPassword: "python123",
  lecturer: {
    name: "Ing. Marek Horváth, PhD.",
    email: "marek.horvath@tuke.sk"
  },
  description:
    "Python ako praktický jazyk pre automatizáciu, aplikácie, dáta, webové služby, testovanie a ďalšie oblasti softvérového vývoja.",
  navigation: [
    { label: "Úvod", href: "/" },
    { label: "Prednášky", href: "/prednasky/" },
    { label: "Cvičenia", href: "/cvicenia/" },
    { label: "Projekt", href: "/projekt/" },
    { label: "Návody", href: "/navody/" },
    { label: "Cheatsheet", href: "/cheatsheet/" }
  ],
  learningAreas: [
    "moderný Python",
    "skriptovanie a automatizácia",
    "GUI",
    "testovanie",
    "HTTP a API",
    "databázy",
    "Data Science",
    "web scraping",
    "bezpečnosť",
    "web backend"
  ],
  weeks: [
    {
      number: 1,
      title: "Úvod ku Pythonu",
      slug: "01-uvod-ku-pythonu",
      lectureAt: "2026-09-21T13:30:00+02:00"
    },
    {
      number: 2,
      title: "Skriptovanie a automatizácia",
      slug: "02-skriptovanie-automatizacia",
      lectureAt: null
    },
    {
      number: 3,
      title: "GUI a event-driven programovanie",
      slug: "03-gui-event-driven",
      lectureAt: null
    },
    {
      number: 4,
      title: "Testovanie, debugging a kvalita kódu",
      slug: "04-testovanie-debugging-kvalita",
      lectureAt: null
    },
    {
      number: 5,
      title: "Internet, HTTP a API",
      slug: "05-http-api",
      lectureAt: null
    },
    {
      number: 6,
      title: "Databázy v Pythone",
      slug: "06-databazy",
      lectureAt: null
    },
    {
      number: 7,
      title: "Data Science v Pythone",
      slug: "07-data-science",
      lectureAt: null
    },
    {
      number: 8,
      title: "Web scraping a automatizácia prehliadača",
      slug: "08-web-scraping-browser",
      lectureAt: null
    },
    {
      number: 9,
      title: "Bezpečné programovanie v Pythone",
      slug: "09-bezpecne-programovanie",
      lectureAt: null
    },
    {
      number: 10,
      title: "Web backend v Pythone",
      slug: "10-web-backend",
      lectureAt: null
    }
  ],
  academicResources: [
    {
      university: "Harvard University",
      title: "CS50's Introduction to Programming with Python",
      description: "Samostatný úvod do Pythonu s úlohami a praktickými príkladmi.",
      href: "https://cs50.harvard.edu/python/"
    },
    {
      university: "MIT",
      title: "Introduction to Computer Science and Programming in Python",
      description: "MIT OpenCourseWare kurz k základom programovania a výpočtového myslenia v Pythone.",
      href: "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/"
    },
    {
      university: "Stanford University",
      title: "CS106A — Programming Methodology",
      description: "Kurz zameraný na metodiku programovania a riešenie problémov.",
      href: "https://web.stanford.edu/class/cs106a/"
    },
    {
      university: "Carnegie Mellon University",
      title: "15-112 — Fundamentals of Programming and Computer Science",
      description: "Rozsiahly kurz základov programovania a informatiky s dôrazom na prax.",
      href: "https://www.cs.cmu.edu/~112/"
    },
    {
      university: "University of Helsinki",
      title: "Python Programming MOOC",
      description: "Otvorený online kurz Pythonu s postupnými programátorskými úlohami.",
      href: "https://programming-26.mooc.fi/"
    }
  ],
  repository: {
    sourceLanguage: "TypeScript",
    presentationEngine: "PowerPoint source with Astro slide viewer",
    webEngine: "Astro"
  }
} as const;
