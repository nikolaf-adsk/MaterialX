#!/bin/bash
timestamp() {
  date +"%T"
}

echo "Generating Javascript MaterialXCore Bindings"
timestamp

em++ -Os --bind \
    JsMaterialXCore/JsTypes.cpp \
    JsMaterialXCore/JsExceptions.cpp \
    JsMaterialXCore/JsUtil.cpp \
    JsMaterialXCore/JsElement.cpp \
    JsMaterialXCore/JsInterface.cpp \
    JsMaterialXCore/JsNode.cpp \
    JsMaterialXCore/JsDefinition.cpp \
    JsMaterialXCore/JsDocument.cpp \
    JsMaterialXCore/JsLook.cpp \
    JsMaterialXCore/JsProperty.cpp \
    JsMaterialXCore/JsGeom.cpp \
    JsMaterialXCore/JsVariant.cpp \
    JsMaterialXCore/JsValue.cpp \
    JsMaterialXCore/JsMaterial.cpp \
    JsMaterialXCore/JsRegisteredVectors.cpp \
    JsMaterialXCore/JsTraversal.cpp \
    JsMaterialXCore/JsObserver.cpp \
    JsMaterialXFormat/JsXmlIo.cpp \
    ../../wasm/_build/source/MaterialXCore/libMaterialXCore.a \
    ../../wasm/_build/source/MaterialXFormat/libMaterialXFormat.a \
    -I../ \
    -std=c++17 \
    -s WASM=1 \
    -s DISABLE_EXCEPTION_CATCHING=0 \
    --post-js JsMaterialXCore/JsTypes.js \
    --post-js JsMaterialXCore/JsGeom.js \
    --post-js JsMaterialXCore/JsDefinition.js \
    --post-js JsMaterialXCore/JsDocument.js \
    --post-js JsMaterialXCore/JsElement.js \
    --post-js JsMaterialXCore/JsInterface.js \
    --post-js JsMaterialXCore/JsLook.js \
    --post-js JsMaterialXCore/JsMaterial.js \
    --post-js JsMaterialXCore/JsNode.js \
    --post-js JsMaterialXCore/JsObserver.js \
    --post-js JsMaterialXCore/JsProperty.js \
    --post-js JsMaterialXCore/JsTraversal.js \
    --post-js JsMaterialXCore/JsUtil.js \
    --post-js JsMaterialXCore/JsValue.js \
    --post-js JsMaterialXCore/JsVariant.js \
    --post-js JsMaterialXFormat/JsXmlIo.js \
    --post-js initMaterialX.js \
    -o ./MaterialX.js