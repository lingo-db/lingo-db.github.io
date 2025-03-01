LingoDB relies on three main external dependencies:
* [LLVM/MLIR 20](https://github.com/llvm/llvm-project)
* [Apache Arrow 19](https://arrow.apache.org/release/19.0.0.html)
* [Boost Context 1.83](https://www.boost.org/doc/libs/1_83_0/libs/context/doc/html/index.html)

**Additional tools and libraries required:**
* C++ compiler supporting C++ 20
* CMake 3.13.4 or newer
* Ninja
* lit (optional, for testing), can be e.g., installed via `pip install lit`

We also provide a [Dockerfile](https://github.com/lingo-db/lingo-db/pkgs/container/lingodb-dev) that contains all dependencies and tools required to build LingoDB.

When building dependencies from source, make sure that either the cmake config files are installed in a system-wide locations, or for example, the `CMAKE_PREFIX_PATH` is set accordingly.

## LLVM/MLIR
### Ubuntu/Linux
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
env VIRTUAL_ENV=/venv cmake -B build  -DLLVM_ENABLE_PROJECTS="llvm;mlir;clang;clang-tools-extra" -DLLVM_TARGETS_TO_BUILD="X86" -DLLVM_BUILD_EXAMPLES=OFF -DCMAKE_BUILD_TYPE=Release -G Ninja -DLLVM_ENABLE_ASSERTIONS=OFF  -DLLVM_BUILD_TESTS=OFF -DLLVM_BUILD_LLVM_DYLIB=ON -DLLVM_LINK_LLVM_DYLIB=OFF -DLLVM_ENABLE_DUMP=ON -DLLVM_ENABLE_FFI=ON -DCMAKE_CXX_FLAGS="-fno-omit-frame-pointer -mno-omit-leaf-frame-pointer" -DLLVM_PARALLEL_LINK_JOBS=1 -DLLVM_PARALLEL_TABLEGEN_JOBS=10 -DBUILD_SHARED_LIBS=OFF -DLLVM_INSTALL_UTILS=ON  -DLLVM_ENABLE_ZLIB=OFF -DCMAKE_INSTALL_PREFIX=[output-dir] llvm/
RUN  cmake --build build --target install -j$(nproc)
```


## Apache Arrow
### Ubuntu/Linux
```shell
wget https://apache.jfrog.io/artifactory/arrow/$(lsb_release --id --short | tr 'A-Z' 'a-z')/apache-arrow-apt-source-latest-$(lsb_release --codename --short).deb
apt install -y -V ./apache-arrow-apt-source-latest-$(lsb_release --codename  --short).deb
apt-get update
apt-get install libarrow-dev=19.*
```
### Binaries
For other recent Linux distributions, you can also rely on the pre-built binaries provided by the Apache Arrow project.

### Building from Source

```shell
wget https://dlcdn.apache.org/arrow/arrow-19.0.1/apache-arrow-19.0.1.tar.gz
tar -xf apache-arrow-19.0.1.tar.gz
RUN cd apache-arrow-19.0.1/cpp
cmake -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=[output-dir] -DARROW_DEPENDENCY_SOURCE=BUNDLED -DARROW_BUILD_STATIC=ON -DARROW_CSV=ON -DARROW_COMPUTE=ON
cmake --build build --target install -j$(nproc)
```
## Boost Context
### Ubuntu/Linux
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