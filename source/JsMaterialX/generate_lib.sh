#!/bin/bash
echo "Generating Wasm Library"
mkdir ./_build
cd ./_build

emcmake cmake \
    ../../.. \
    -G "Unix Makefiles" \
    -DMATERIALX_BUILD_JS=ON

emmake make