# Javascript Support

A Javascript package is created from the following modules.

- [JsMaterialXCore](JsMaterialXCore): Contains all of the core classes and util functions.
- [JsMaterialXFormat](JsMaterialXFormat): Contains the `readFromXmlString` function to read a MaterialX string.

## Generating JS/WASM

### Prerequisites

Make sure to clone the [emsdk repository](https://github.com/emscripten-core/emsdk), install and enable the latest emsdk environment.
```sh
# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git

# Enter that directory
cd emsdk

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
./emsdk activate latest
```

For more information follow the steps described in the [emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html). 

### Build
In the root of directory of this repository run the following:

#### CMake
The JavasScript library can be built using cmake and make.

1. Activate the emscripten environment
```sh
source ../../../../emsdk/emsdk_env.sh
```

2. Create the `_build` folder
```sh
mkdir -p ./_build
cd ./_build
```

3. Run cmake and make
```sh
# This will generate the release library
# To build the non minified debug version replace -DBUILD_TYPE=RELEASE with -DBUILD_TYPE=DEBUG
emcmake cmake ../../.. -DMATERIALX_BUILD_JS=ON -DBUILD_TYPE=RELEASE
emmake make
```

#### build.sh
There is a helper script called `build.sh` that will do the above steps.

1. Build the release WebAssembly binary and the JavaScript library.

```sh
./build.sh
```

To build the debug version call:
```sh
./build.sh DEBUG
```

### Output
After building the project the `MaterialXLib.wasm` and `MaterialXLib.js` files can be found in `./_build/source/JsMaterialX/`.

### Testing
The JavaScript tests are located in `./test` folder and are defined with the `.spec.js` suffix.
Most of these tests were copied over from the Python [main.py tests](../../python/MaterialXTest/main.py).

#### Setup
These tests require node.js and npm which can be installed [HERE](https://nodejs.org/en/download/).

1. Install the npm packages.
```sh
cd ./test && npm install
```

2. Run the tests
```sh
npm run test
```


