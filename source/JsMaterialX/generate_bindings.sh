#!/bin/bash
echo "Generating Javascript MaterialXCore Bindings"
cd ./JsMaterialXCore
em++ --bind \
    JsTypes.cpp \
    JsExceptions.cpp \
    JsUtil.cpp \
    JsElement.cpp \
    JsInterface.cpp \
    JsNode.cpp \
    JsDocument.cpp \
    ../../../wasm/source/MaterialXCore/libMaterialXCore.a \
    -I../../ \
    -std=c++17 \
    -s WASM=1 \
    -s DISABLE_EXCEPTION_CATCHING=0 \
    -o ./MaterialXCore.js