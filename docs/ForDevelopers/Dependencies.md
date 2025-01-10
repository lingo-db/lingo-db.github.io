* All "non-standard" dependencies are packaged as python programs
* We are building LLVM

* in `tools/mlir-package`:  
    * `docker build -t mlir-package .`
    *  `docker run -v ".:/built-packages" -v ".:/repo"  --rm -it mlir-package /usr/bin/create_package.sh cp312-cp312`
