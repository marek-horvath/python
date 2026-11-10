# Pinned ClassicThesis

This directory contains the **unmodified ClassicThesis 4.1 implementation** from
the repository specified for this project:

https://github.com/ClassicThesis/ClassicThesis

Pinned revision: `f7ff17a17ab62abe24ce9434c4930b350aef91f2`.

- `classicthesis.sty`: original implementation by André Miede.
- `COPYING`: upstream GNU GPL, version 2 or later.
- `upstream-config.tex`: original configuration retained as a reference; the
  project loads `book/classicthesis-config.tex` instead.

The repository describes itself as an old fork. This project intentionally pins
the version from the requested repository rather than silently loading whichever
ClassicThesis happens to be installed on the build machine. Upstream typography,
chapter and section formatting, page styles and text block are used directly.

Compatibility adjustments are kept outside the upstream code, in `book/compat/`:

- `scrpage2.sty` forwards the retired KOMA page-style interface to
  `scrlayer-scrpage`.
- `unicode-spacing.tex` applies the original 0.15em and 0.075em tracking via
  fontspec, avoiding the old soul byte-font reconstruction on Slovak Unicode.

No GPL notice or upstream copyright header has been removed.
