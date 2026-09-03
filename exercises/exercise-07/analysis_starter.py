from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

DATA_DIR = Path(__file__).parent
RESULTS_PATH = DATA_DIR / "programming_results.csv"
STUDENTS_PATH = DATA_DIR / "students.csv"


def load_results() -> pd.DataFrame:
    return pd.read_csv(RESULTS_PATH)


def main() -> None:
    df = load_results()

    # Úloha 1: preskúmajte dataset cez head, shape, info, describe a isna.
    print(df.head())

    # Úlohy 2-10: dopĺňajte riešenie postupne podľa webového zadania.
    # Odporúčanie: pôvodný df nemeňte priamo; vytvorte clean_df.

    plt.close("all")


if __name__ == "__main__":
    main()
