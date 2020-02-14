# Javascript Support

A Javascript package is created from the following modules.

- [WasmMaterialXCore](WasmMaterialXCore): Wasm/Javascript module for MaterialX core

## Generating JS/WASM

### Prerequisites

Make sure to clone the [emsdk repository](https://github.com/emscripten-core/emsdk) and install and enable the latest emsdk environment.

### Steps
In the root of directory of this repository run the following:

1. mkdir ./wasm
2. cd ./wasm
3. emcmake cmake .. -G "Unix Makefiles" -DMATERIALX_BUILD_WASM=1
4. emmake make // This will generate a libMaterialX.a
5. cd /mnt/c/GitHub/PUBLIC/autodesk-forks/MaterialXWin/MaterialX/source/WasmMaterialX/WasmMaterialXCore
6. em++ --bind WasmUtil.cpp ../../../wasm/source/MaterialXCore/libMaterialX.a -I../../ -std=c++11 -s WASM=1 -o ../MaterialXCore.js