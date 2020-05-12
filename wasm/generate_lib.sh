#!/bin/bash
echo "Generating Wasm Library"
mkdir ./_build
cd ./_build

emcmake cmake \
    ../.. \
    -G "Unix Makefiles" \
    -DMATERIALX_BUILD_WASM=1 \
    -DMATERIALX_BUILD_RENDER=OFF \
    -DMATERIALX_BUILD_TESTS=OFF

emmake make