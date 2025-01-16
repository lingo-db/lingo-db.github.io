* All "non-standard" dependencies are packaged as python programs
* Also MLIR/LLVM is packaged as a python program.
* ***This will be subject to change in the near future!*** We are working on using system-wide installed MLIR/LLVM packages and reduce the number of dependencies in general.


### Building the custom MLIR/LLVM package
* in `tools/mlir-package`:  
    * `docker build -t mlir-package .`
    *  `docker run -v ".:/built-packages" -v ".:/repo"  --rm -it mlir-package /usr/bin/create_package.sh cp312-cp312`
