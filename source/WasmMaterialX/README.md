# Javascript Support

A Javascript package is created from the following modules.

- [WasmMaterialXCore](WasmMaterialXCore): Wasm/Javascript module for MaterialX core

## Generating JS/WASM

### Prerequisites

Make sure to clone the [emsdk repository](https://github.com/emscripten-core/emsdk), install and enable the latest emsdk environment.
For more information follow the steps described in the [emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html). 

### Steps
In the root of directory of this repository run the following:

1. Generate the wasm folder from the root.

```sh
mkdir ./wasm
```

2. cd into the new folder.

```sh
cd ./wasm
```

3. Generate a makefile from the CMakeLists.txt. 

```sh
emcmake cmake .. -G "Unix Makefiles" -DMATERIALX_BUILD_WASM=1 -DEMSCRIPTEN=1
```

4. Generate the binary library. This command will generate a libMaterialX.a file.

```sh
emmake make
```

5. cd into the wasm source code

```sh
cd ../source/WasmMaterialX/WasmMaterialXCore
```

6. Generate the wasm and javascript files for the bindings.

```sh
em++ --bind WasmUtil.cpp WasmElement2.cpp ../../../wasm/source/MaterialXCore/libMaterialXCore.a -I../../ -std=c++11 -s WASM=1 -s DISABLE_EXCEPTION_CATCHING=0 -o ../MaterialXCore.js
```