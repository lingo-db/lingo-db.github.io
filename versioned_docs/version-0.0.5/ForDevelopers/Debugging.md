---
title: Debugging & Profiling
---

Compared to interpreted execution engines, compiling engines come with many advantages but also some challenges.
Especially debugging and profiling can become a challenge, as one not only needs to debug and profile the engine code, but also the generated code.
Possible solutions to these problems have been discussed before for debugging [Hyper](https://ieeexplore.ieee.org/document/8667737) and [Umbra](https://dl.acm.org/doi/abs/10.1145/3395032.3395321) and [profiling Umbra](https://dl.acm.org/doi/abs/10.1145/3447786.3456254).

## Guide: Profiling queries
For profiling queries LingoDB comes with a *ct* tool that collects several metrics.
For the following instructions, we assume that LingoDB was built in Release mode with debugging informations (`build/lingodb-relwithdebinfo/.buildstamp` ).

1. Run the ct.py script with query and dataset: `python3 tools/ct/ct.py resources/sql/tpch/1.sql resources/data/tpch-1/`. If the build directory is not `build/lingodb-relwithdebinfo`, it can be supplied with the `BIN_DIR` environment variable
2. Open the resulting `ct.json` file with the [CT viewer](https://ct.lingo-db.com) and explore it in detail

## Guide: Debugging
* If the compilation fails: Use [Snapshotting](#snapshotting) to identify the broken/problematic pass. Then run the pass isolated with [mlir-db-opt](../GettingStarted/CommandLineTools.md#performing-optimizations-and-lowerings) for detailed debugging (e.g., with gdb). 
* If compilation succeeds but execution fails in/because generated code: First check if the error persists when switching to the [C++-Backend](#c-backend) if possible (i.e., all MLIR operations are supported)
  * If yes: debug with this backend. 
  * If not: you should use the [LLVM Debug Backend](#llvm-debug-backend)

## Guide: Quick iteration through standalone CMake projects
As discussed [here](StandaloneQuery.md), LingoDB can compile SQL queries to C++ queries and create standalone CMake projects that allow for quick iterations, without adapting the compilation pipeline at all.

## Components for Debugging and Profiling
### Location Tracking in MLIR
In MLIR, every operation is associated with a *Location*, that must be provided during operation creation.
While it is possible to provide a *Unknown Location*, it should be avoided.
When parsing a MLIR file, MLIR automatically annotates the parsed operations with the corresponding file locations.
When new operations are created during a pass they are usually annotated with the location of the current operation that is transformed or lowered.
**All passes in LingoDB ensure that correct locations are set afterwards.**

### Snapshotting
MLIR already comes with a `LocationSnapshotPass` that takes an operation (e.g. a MLIR Module) and writes it to disk, including the annotated locations.
Then, this file is now read back in, now annotating the locations *according to the location inside this newly written file*.

If enabled (cf [Settings](Settings.md) ), LingoDB performs multiple location snapshots on after every or selected (important) MLIR passes.

Using this snapshot files, we can track the origin of any operation, by recursively following the following steps
1. get the origin location of the current operation by looking in the appropriate snapshot file
2. find the origin operation by going to this location

### Special Compiler Backends
In addition to location tracking and snapshotting, LingoDB implements two special compiler backends for debugging.

#### LLVM-Debug Backend
Instead of using the standard LLVM backend, another LLVM-based backend can be used that adds debug information and performs no optimizations.
This backend is selected by setting the environment variable `LINGODB_EXECUTION_MODE=DEBUGGING`.
During the execution, standard debuggers like `gdb` will then point to the corresponding operation in the last snapshot that was performed
This enables basic tracking of problematic operations, but advanced debugging will remain difficult.

#### C++-Backend
For more advanced debugging, a *C++-Backend* can be used by setting `LINGODB_EXECUTION_MODE=C`.
This backend directly translates a fixed set of low-level generic MLIR operations to C++ statements and functions that are written to a file called `mlir-c-module.cpp`.
Next, LingoDB automatically invokes `clang++` (must be installed!) with `-O0` and `-g` to compile this C++ file into a shared library with debug informations.
This shared library is then loaded with `dlopen` and the main function is called.
Thus, the generated code can be debugged as any usual C++ program.
To help with tracking an error to higher-level MLIR operations, each C++ statement is preceeded with a comment containing the original operation and it's location.


### Lightweight Tracing
When compiled as `RelWithDebInfo`, LingoDB will produce a trace file with events (type, start timestamp, duration, thread) as trace.json.
This trace file can then be opened with the [CT Viewer](https://ct.lingo-db.com)
