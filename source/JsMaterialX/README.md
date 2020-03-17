# Javascript Support

A Javascript package is created from the following modules.

- [WasmMaterialXCore](WasmMaterialXCore): Wasm/Javascript module for MaterialX core

## Generating JS/WASM

### Prerequisites

Make sure to clone the [emsdk repository](https://github.com/emscripten-core/emsdk), install and enable the latest emsdk environment.
For more information follow the steps described in the [emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html). 

### Steps
In the root of directory of this repository run the following:

1. cd into the new folder.

```sh
cd ./wasm
```

2. Generate the MaterialX libraries that will be used for the js bindings. 

```sh
./generate_lib.sh
```

3. cd into the javascript bindings directory. 

```sh
cd ../source/JsMaterialX
```

4. Generate the wasm and javascript files for the bindings.

```sh
./generate_bindings.sh
```

To debug the em++ command append `EMCC_DEBUG=1` to the shell command in `generate_bindings.sh`.

```sh
EMCC_DEBUG=1 em++ ...
```


### Testing

1. Start a server in the JsMaterialX directory

```sh
python -m http.server 9000
```

2. In your browser load: http://localhost:9000/JsMaterialXCore/test/index.html

There will be some console logs in the browser console. 

