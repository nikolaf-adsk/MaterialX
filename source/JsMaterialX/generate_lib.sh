#!/bin/bash
echo "Generating Wasm Library"
mkdir ./_build
cd ./_build

emcmake cmake \
    ../../../CMakeLists.txt \
    -G "Unix Makefiles" \
    -DMATERIALX_BUILD_WASM=ON

emmake make