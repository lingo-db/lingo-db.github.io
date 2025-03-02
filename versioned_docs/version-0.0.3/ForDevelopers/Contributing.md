
LingoDB is an open-source project that welcomes contributions from the community.
However, it is also a research project that still undergoes major changes (often not in public repositories) that might conflict with your contributions.
Furthermore, the project is developed by a very small team of researchers and students, which means that we have limited resources to review and merge pull requests.
Finally, we have to ensure that the codebase stays maintainable and that the project's goals are met.
Thus, please follow the guidelines below when planning to contribute to LingoDB.

### Micro-Changes such as fixing typos, etc
If you find a small typo or similar in one of the LingoDB repositories, please open an *Issue* in the respective repository.
We won't accept pull requests for such small changes, but we will be happy to fix them ourselves as soon as possible.

Examples:
* Typos
* Slight rephrasing of existing sentences
* Updating npm dependencies
* ...

### Medium-sized Changes: Create a Pull Request
If you want to contribute a medium-sized change, please create a pull request in the respective repository.

Examples:
* Any changes to the documentation
* Bug-Fixes that do not require large changes/redesign (e.g., fixing a segfault)
* Smallish new features (e.g., adding a new command line option, adding a new SQL function (e.g., `sin`))
* Adding new tests

### Large Changes: Discuss first
If you want to contribute a larger change, please open an issue in the respective repository first.
This way, we can discuss the change before you start working on it and we can avoid situations like:
* You working on a feature that is already in development
* You working on a feature that is not in line with the project's goals and won't be merged
* You working on a feature that will not be working soon due to other changes in the project

Examples:
* Add a new compilation backend/target
* Refactor the SQL parser
* Refactorings
* Larger features that touch the code base in many places
* Anything that is more "researchy"

### Before Creating a Pull Request
Before creating a pull request, please make sure that
* the CI pipeline passes and the coverage does not decrease.
* the code is formatted according to the `.clang-format` file in the repository
