---
title: Installation
type: docs
weight: 1
---
## Binaries
On the [Release Page](https://github.com/lingo-db/lingo-db/releases/tag/v0.0.3), you can find pre-built binaries for Linux/AMD64.
These binaries only depend on standard libraries (`libpthread`,`librt`,`libstdc++`,`libm`,`libgcc`,`libc`) and can be run on most Linux systems.





[//]: <> (Think about where to distribute the python packages)
## Python Package
Install via pip, then use as [documented here](./Python.md)
```
pip install lingodb
```


## Building from source
1. Ensure you have a machine with sufficient compute power and space
1. Make sure that you have the all [dependencies](../ForDevelopers/Dependencies.md) installed
1. Build LingoDB
    * Debug Version : `make build-debug` (will create binaries under `build/lingodb-debug`)
    * Release Version : `make build-release` (will create binaries under `build/lingodb-release`)


