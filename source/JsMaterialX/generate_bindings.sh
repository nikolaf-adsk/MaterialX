#!/bin/bash
timestamp() {
  date +"%T"
}

echo "Generating Javascript MaterialXCore Bindings"
timestamp
cd ./JsMaterialXCore
em++ --bind \
    JsTypes.cpp \
    JsExceptions.cpp \
    JsUtil.cpp \
    JsElement.cpp \
    JsInterface.cpp \
    JsNode.cpp \
    JsDefinition.cpp \
    JsDocument.cpp \
    JsLook.cpp \
    JsProperty.cpp \
    JsGeom.cpp \
    JsVariant.cpp \
    JsValue.cpp \
    JsMaterial.cpp \
    JsRegisteredVectors.cpp \
    JsTraversal.cpp \
    ../../../wasm/_build/source/MaterialXCore/libMaterialXCore.a \
    -I../../ \
    -std=c++17 \
    -s WASM=1 \
    -s DISABLE_EXCEPTION_CATCHING=0 \
    -o ./MaterialXCore.js