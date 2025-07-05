import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

LingoDB relies on three main external dependencies:
* [LLVM/MLIR 20](https://github.com/llvm/llvm-project)
* [Apache Arrow 20](https://arrow.apache.org/release/19.0.0.html)
* [Boost Context 1.83](https://www.boost.org/doc/libs/1_83_0/libs/context/doc/html/index.html)

**Additional tools and libraries required:**
* C++ compiler supporting C++ 20
* CMake 3.13.4 or newer
* Ninja
* lit (optional, for testing), can be e.g., installed via `pip install lit`

We also provide a [Dockerfile](https://github.com/lingo-db/lingo-db/pkgs/container/lingodb-dev) that contains all dependencies and tools required to build LingoDB.

When building dependencies from source, make sure that either the cmake config files are installed in a system-wide locations, or for example, the `CMAKE_PREFIX_PATH` is set accordingly.

## LLVM/MLIR

<Tabs groupId="os-tabs">
<TabItem value="linux" label="Ubuntu/Linux">
Follow the instructions on [https://apt.llvm.org/](https://apt.llvm.org/) to install the repository on your system.
Then install the following packages: `clang-20 llvm-20 libclang-20-dev llvm-20-dev libmlir-20-dev mlir-20-tools clang-tidy-20`

### Binaries
For other recent Linux distributions, you can also rely on the pre-built binaries provided by the LLVM project on the Github release pages.

### Building from Source

```shell
wget https://github.com/llvm/llvm-project/releases/download/llvmorg-20.1.0-rc1/llvm-project-20.1.0-rc1.src.tar.xz
tar -xf llvm-project-20.1.0-rc1.src.tar.xz
mkdir llvm-project-20.1.0-rc1.src/build
cd llvm-project-20.1.0-rc1.src
export INSTALL_PREFIX=[install_prefix]
env VIRTUAL_ENV=/venv cmake -B build  -DLLVM_ENABLE_PROJECTS="llvm;mlir;clang;clang-tools-extra" -DLLVM_TARGETS_TO_BUILD="X86" -DLLVM_BUILD_EXAMPLES=OFF -DCMAKE_BUILD_TYPE=Release -G Ninja -DLLVM_ENABLE_ASSERTIONS=OFF  -DLLVM_BUILD_TESTS=OFF -DLLVM_BUILD_LLVM_DYLIB=ON -DLLVM_LINK_LLVM_DYLIB=OFF -DLLVM_ENABLE_DUMP=ON -DLLVM_ENABLE_FFI=ON -DCMAKE_CXX_FLAGS="-fno-omit-frame-pointer -mno-omit-leaf-frame-pointer" -DLLVM_PARALLEL_LINK_JOBS=1 -DLLVM_PARALLEL_TABLEGEN_JOBS=10 -DBUILD_SHARED_LIBS=OFF -DLLVM_INSTALL_UTILS=ON  -DLLVM_ENABLE_ZLIB=OFF -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX llvm/
cmake --build build --target install -j$(nproc)
```

</TabItem>
<TabItem value="macos" label="MacOS">
Install LLVM/MLIR using Homebrew and make it available system-wide:

```shell
brew install llvm@20
brew link --force llvm@20
```

### Binaries
⚠️ **Caution**: the pre-built binaries provided by the LLVM project on the Github release pages **DO NOT** serve as a replacement, since they lack the required MLIR support.

### Building from Source

1. Install XCode (through the App Store).
2. Install the build requisites: `brew install cmake ninja z3`
2. Make sure to replace [install_prefix] with your preferred install path of LLVM.
```shell
wget https://github.com/llvm/llvm-project/releases/download/llvmorg-20.1.4/llvm-project-20.1.4.src.tar.xz
tar -xf llvm-project-20.1.4.src.tar.xz
mkdir llvm-project-20.1.4.src/build
cd llvm-project-20.1.4.src
export INSTALL_PREFIX=[install_prefix]
export SDKROOT=$(xcrun --sdk macosx --show-sdk-path)
env VIRTUAL_ENV=/venv cmake -B build  -DLLVM_ENABLE_PROJECTS="clang;clang-tools-extra;mlir;polly;lldb" -DLLVM_ENABLE_RUNTIMES="compiler-rt;libcxx;libcxxabi;libunwind;pstl;openmp" -DLLVM_TARGETS_TO_BUILD="AArch64" -DLLVM_BUILD_EXAMPLES=OFF -DCMAKE_BUILD_TYPE=Release -G Ninja -DLLVM_ENABLE_ASSERTIONS=ON  -DLLVM_BUILD_TESTS=OFF -DLLVM_BUILD_LLVM_DYLIB=ON -DLLVM_LINK_LLVM_DYLIB=ON -DLLVM_ENABLE_DUMP=ON -DLLVM_ENABLE_FFI=ON -DCMAKE_CXX_FLAGS="-fno-omit-frame-pointer -mno-omit-leaf-frame-pointer" -DLLVM_PARALLEL_LINK_JOBS=1 -DLLVM_PARALLEL_TABLEGEN_JOBS=10 -DBUILD_SHARED_LIBS=OFF -DLLVM_INSTALL_UTILS=ON  -DLLVM_ENABLE_ZLIB=OFF -DLLVM_POLLY_LINK_INTO_TOOLS=ON -DLLVM_BUILD_EXTERNAL_COMPILER_RT=ON -DLLVM_ENABLE_EH=OFF -DLLVM_ENABLE_RTTI=ON -DLLVM_INCLUDE_DOCS=OFF -DLLVM_INCLUDE_TESTS=OFF -DLLVM_OPTIMIZED_TABLEGEN=ON -DLLVM_USE_RELATIVE_PATHS_IN_FILES=ON -DLLVM_SOURCE_PREFIX=. -DLLDB_USE_SYSTEM_DEBUGSERVER=ON -DLIBOMP_INSTALL_ALIASES=OFF -DLIBCXX_INSTALL_MODULES=ON -DLLVM_CREATE_XCODE_TOOLCHAIN=OFF -DCLANG_FORCE_MATCHING_LIBCLANG_SOVERSION=OFF -DLLVM_BUILD_LLVM_C_DYLIB=ON -DLLVM_ENABLE_LIBCXX=ON -DLIBCXX_PSTL_BACKEND=libdispatch -DCMAKE_INSTALL_LIBDIR=lib -DCMAKE_FIND_FRAMEWORK=LAST -DCMAKE_VERBOSE_MAKEFILE=ON -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=/opt/homebrew/Library/Homebrew/cmake/trap_fetchcontent_provider.cmake -Wno-dev -DCMAKE_OSX_SYSROOT=$(xcrun --sdk macosx --show-sdk-path) -DLLVM_ENABLE_Z3_SOLVER=ON -DFFI_INCLUDE_DIR=$(xcrun --sdk macosx --show-sdk-path)/usr/include/ffi -DFFI_LIBRARY_DIR=$(xcrun --sdk macosx --show-sdk-path)/usr/lib -DLIBCXX_INSTALL_LIBRARY_DIR=$INSTALL_PREFIX/lib/c++ -DLIBUNWIND_INSTALL_LIBRARY_DIR=$INSTALL_PREFIX/lib/unwind -DLIBCXXABI_INSTALL_LIBRARY_DIR=$INSTALL_PREFIX/c++ -DRUNTIMES_CMAKE_ARGS="-DCMAKE_INSTALL_RPATH=@loader_path|@loader_path/../unwind" -DBUILTINS_CMAKE_ARGS="-DCOMPILER_RT_ENABLE_IOS=OFF;-DCOMPILER_RT_ENABLE_WATCHOS=OFF;-DCOMPILER_RT_ENABLE_TVOS=OFF" -DCMAKE_PREFIX_PATH=/opt/homebrew -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX llvm/
cmake --build build --target install -j$(sysctl -n hw.logicalcpu)
```
</TabItem>
</Tabs>

## Apache Arrow

<Tabs groupId="os-tabs">
<TabItem value="linux" label="Ubuntu/Linux">

```shell
wget https://apache.jfrog.io/artifactory/arrow/$(lsb_release --id --short | tr 'A-Z' 'a-z')/apache-arrow-apt-source-latest-$(lsb_release --codename --short).deb
apt install -y -V ./apache-arrow-apt-source-latest-$(lsb_release --codename  --short).deb
apt-get update
apt-get install libarrow-dev=20.*
```

### Binaries
For other recent Linux distributions, you can also rely on the pre-built binaries provided by the Apache Arrow project.

### Building from Source

```shell
wget https://github.com/apache/arrow/releases/download/apache-arrow-20.0.0/apache-arrow-20.0.0.tar.gz
tar -xf apache-arrow-20.0.0.tar.gz
cd apache-arrow-20.0.0/cpp
cmake -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=[output-dir] -DARROW_DEPENDENCY_SOURCE=BUNDLED -DARROW_BUILD_STATIC=ON -DARROW_CSV=ON -DARROW_JSON=ON -DARROW_COMPUTE=ON apache-arrow-20.0.0/cpp
cmake --build build --target install -j$(nproc)
```

</TabItem>
<TabItem value="macos" label="MacOS">

Install Apache Arrow using Homebrew:

```shell
brew tap lingo-db/homebrew https://github.com/lingo-db/homebrew.git
brew install lingo-db/homebrew/apache-arrow@20
```

### Building from Source

```shell
wget https://github.com/apache/arrow/releases/download/apache-arrow-20.0.0/apache-arrow-20.0.0.tar.gz
tar -xf apache-arrow-20.0.0.tar.gz
cd apache-arrow-20.0.0/cpp
cmake -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=[output-dir] -DARROW_DEPENDENCY_SOURCE=BUNDLED -DARROW_BUILD_STATIC=ON -DARROW_CSV=ON -DARROW_JSON=ON -DARROW_COMPUTE=ON -DCMAKE_PREFIX_PATH=/opt/homebrew/ -DCMAKE_CXX_COMPILER=/opt/homebrew/bin/clang++ -DCMAKE_C_COMPILER=/opt/homebrew/bin/clang
cmake --build build --target install -j$(sysctl -n hw.logicalcpu)
```

</TabItem>
</Tabs>

## Boost Context

<Tabs groupId="os-tabs">
<TabItem value="linux" label="Ubuntu/Linux">

```shell
apt-get install libboost-context1.83-dev
```

### Build from Source
```shell
wget https://archives.boost.io/release/1.83.0/source/boost_1_83_0.tar.gz
tar -xf boost_1_83_0.tar.gz
cd boost_1_83_0
 ./bootstrap.sh --prefix=/usr # or any other directory in the PATH/LD_LIBRARY_PATH
 ./b2 install --with-context
```

</TabItem>
<TabItem value="macos" label="MacOS">

Install Boost Context using Homebrew:

```shell
brew install boost
```

</TabItem>
</Tabs>
