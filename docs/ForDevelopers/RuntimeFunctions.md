---
title: Runtime functions
---

Similar to other compiling query engines, LingoDB does not fully generate all required code for a query just-in-time, but relies on *calling into pre-compiled runtime functions* written in C++.

They live in the following two directories:

* [include/lingodb/runtime](https://github.com/lingo-db/lingo-db/tree/main/include/lingodb/runtime)
* [src/runtime](https://github.com/lingo-db/lingo-db/tree/main/src/runtime)

Generally, runtime functions can be called from generated code in MLIR by
1. declaring the function as an external function in MLIR (with the correct argument and result types)
2. calling the declared function using a `func.call` operation
3. make sure that the compilation backend (e.g., LLVM) can resolve the external functions.

In LingoDB, we added advanced tooling to make those step easy:

1. Add `gen_rt_def([name]-defs "[RuntimeHeader].h")` in the main CMakeList.txt, which produces a cmake target, that generates helper functionality for calling runtime functions from the `include/lingodb/runtime/[RuntimeHeader].h`. Make sure to then include this target as dependency for e.g., the cmake targets corresponding to MLIR passes that introduce these runtime calls
2. Import the generated helper functionality `#include "lingodb/compiler/runtime/[RuntimeHeader].h"`
3. Call runtime functions by calling the runtime function:
```cpp
mlir::Value res = rt::[RuntimeHeader]::merge(builder, loc)(mlir::ValueRange{arg1,arg2,arg3})[0];
```

Under the hood this helper functionality:
1. auto-inserts the declaration of the external function into the MLIR module with the correct types matching the C++ runtime function
2. inserts the `func.call` operation at the current operation
3. ensures that the compilation backend is able to resolve this function to a valid function pointer

This is achieved by a custom [clang-tool](https://github.com/lingo-db/lingo-db/blob/main/tools/build-tools/runtime-header-tool.cpp) that is invoked at build time, inspects the AST of the corresponding header file  and generates the helper functionality.