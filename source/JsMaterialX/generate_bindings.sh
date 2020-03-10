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
    JsObserver.cpp \
    ../../../wasm/_build/source/MaterialXCore/libMaterialXCore.a \
    -I../../ \
    -std=c++17 \
    -s WASM=1 \
    -s DISABLE_EXCEPTION_CATCHING=0 \
    --post-js JsDefinition.js \
    --post-js JsDocument.js \
    --post-js JsElement.js \
    --post-js JsGeom.js \
    --post-js JsInterface.js \
    --post-js JsLook.js \
    --post-js JsMaterial.js \
    --post-js JsNode.js \
    --post-js JsObserver.js \
    --post-js JsProperty.js \
    --post-js JsTraversal.js \
    --post-js JsTypes.js \
    --post-js JsUtil.js \
    --post-js JsValue.js \
    --post-js JsVariant.js \
    --post-js initMaterialX.js \
    -o ./MaterialXCore.js