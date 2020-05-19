#!/bin/bash
echo "Generating Wasm Library"
# Enable the emsdk environment
source ../../../../emsdk/emsdk_env.sh

MAIN=`pwd`
BUILD=$MAIN/_build
mkdir -p $BUILD

cd $BUILD

emcmake cmake ../../.. -DMATERIALX_BUILD_JS=ON -DBUILD_TYPE=$1
emmake make