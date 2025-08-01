---
title: Generating a standalone CMake project for a specific query
---
Sometimes, you want to quickly experiment with speeding up a particular SQL query without diving into LingoDB’s full compiler pipeline. For this, LingoDB provides a script that generates a standalone, minimal CMake project for just that query. The query is compiled ahead-of-time into C++ and linked against LingoDB’s runtime.


### 1. Generate CMake project for your query

**Command:**
```bash
bash tools/standalone-query/create.sh \
  my_query.sql \
  my/db/dir \
  build-dir \
  /absolute/path/to/experiments/my-query \
  speedup-query
```

- **my_query.sql**: path to your `.sql` file.
- **my/db/dir**: path to an existing LingoDB database directory.
- **build-dir**: directory containing the `compile-to-cpp` executable, e.g., `build/lingodb-debug`
- **/absolute/path/to/experiments/my-query**: new worktree directory (must *not* exist).
- **speedup-query**: name for the experimental branch (must *not* exist).

This script performs the following steps:
1. generate sparse git worktree (to make sure that you can work with git/commit your changes)
2. prepares the project (e.g., prepares custom CMakeLists.txt)
3. compiles the SQL query to a C++ file that is placed in the new CMake project
4. Finally, it prints some helpful information, for example:
```bash

== Standalone query worktree created ==
Branch: speedup-query
Worktree directory: /home/alice/projects/experiments/my-query

== Commands to build the standalone query executable ==
cd /home/alice/projects/experiments/my-query
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . -j$(nproc)

== Commands to run the standalone query executable ==
./main /home/alice/projects/lingodb/db-dir

== Commands to clean up the worktree ==
cd /home/alice/projects/lingodb
git worktree remove /home/alice/projects/experiments/my-query --force
(optional) git branch -D speedup-query
```

---

### 2. Use the generated project

- It’s a **normal CMake/C++** project—use your debugger, profiler, or editor of choice.
- Feel free to edit **any** sources:
    - Tweak the generated `query.cpp`.
    - Modify runtime code.
- Because it lives in a separate Git worktree & branch, your experiments won’t affect the main codebase.

---

### 3. Commit selected changes

- Any fixes or optimizations you make to runtime components will live on your **experimental branch**.
- When ready, switch back to your main worktree and either cherry-pick or merge your changes

