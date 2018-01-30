# SemVer PreReleases Versions Tests

## Purpose

Testing [npm semver](https://github.com/npm/node-semver) regarding prerelease versions.

Results:

- Comparison: `2018.2.0-dev.999` < `2018.2.0-master.998` < `2018.2.0`
- Incrementing `2018.2.0-dev.999` / `patch` => `2018.2.0`.
  - It's a way to toggle from prerelease to release.
- Install: the pattern `^2018.2.0-dev` works to fetch:
  - The lastest `2018.2.0` versions, including prereleases `dev` and `master`.
  - Next release versions, e.g. next patch `2018.2.1`, next minor version `2018.3.0`
  - But NOT for next versions prereleases (e.g. `2018.2.1-dev.0`, `2018.3.0-dev.0`).

## Launch

`node test`
