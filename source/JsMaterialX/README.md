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

5. cd into the javascript source code

```sh
cd ../source/JsMaterialX/JsMaterialXCore
```

6. Generate the wasm and javascript files for the bindings.

```sh
em++ --bind JsTypes.cpp JsExceptions.cpp JsUtil.cpp JsElement.cpp JsInterface.cpp JsNode.cpp JsDocument.cpp ../../../wasm/source/MaterialXCore/libMaterialXCore.a -I../../ -std=c++17 -s WASM=1 -s DISABLE_EXCEPTION_CATCHING=0 -o ../MaterialXCore.js
```

To debug the em++ command append `EMCC_DEBUG=1` to the shell command above.

```sh
EMCC_DEBUG=1 em++ --bind ...
```


### Testing

1. Start a server in the JsMaterialX directory

```sh
python -m http.server 9000
```

2. In your browser load: http://localhost:9000/binding.html

There will be some console logs in the browser console. 

