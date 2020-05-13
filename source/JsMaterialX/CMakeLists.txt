message("TEST------------------------------------")

set(OUTPUT_CORE ${CMAKE_CURRENT_SOURCE_DIR}/JsMaterialXCore/)
set(OUTPUT_FORMAT ${CMAKE_CURRENT_SOURCE_DIR}/JsMaterialXFormat/)
set(OUTPUT_LIBS ${CMAKE_CURRENT_SOURCE_DIR}/_build/source/MaterialXCore/)

set(CORE_DEPS ${OUTPUT_CORE}JsTypes.cpp
    ${OUTPUT_CORE}JsExceptions.cpp
    ${OUTPUT_CORE}JsUtil.cpp
    ${OUTPUT_CORE}JsElement.cpp
    ${OUTPUT_CORE}JsInterface.cpp
    ${OUTPUT_CORE}JsNode.cpp
    ${OUTPUT_CORE}JsDefinition.cpp
    ${OUTPUT_CORE}JsDocument.cpp
    ${OUTPUT_CORE}JsLook.cpp
    ${OUTPUT_CORE}JsProperty.cpp
    ${OUTPUT_CORE}JsGeom.cpp
    ${OUTPUT_CORE}JsVariant.cpp
    ${OUTPUT_CORE}JsValue.cpp
    ${OUTPUT_CORE}JsMaterial.cpp
    ${OUTPUT_CORE}JsRegisteredVectors.cpp
    ${OUTPUT_CORE}JsTraversal.cpp
    ${OUTPUT_CORE}JsObserver.cpp)

set(FORMAT_DEPS ${OUTPUT_FORMAT}JsXmlIo.cpp)

set(LIB_DEPS ${OUTPUT_LIBS}libMaterialXCore.a ${OUTPUT_LIBS}libMaterialXFormat.a)

add_executable(jsBindings jsBindings.cpp)

message("${CORE_DEPS} ${FORMAT_DEPS} ${LIB_DEPS}")

target_link_libraries(jsBindings ${CORE_DEPS} ${FORMAT_DEPS} ${LIB_DEPS})

set(JS_FLAGS "-I${CMAKE_CURRENT_SOURCE_DIR}/../../ -std=c++17 -s WASM=1 -s DISABLE_EXCEPTION_CATCHING=0 -s MODULARIZE=1 -s EXPORT_ES6=1 -s USE_ES6_IMPORT_META=0 ")

#string(APPEND JS_FLAGS "--post-js JsMaterialXCore/JsTypes.js --post-js JsMaterialXCore/JsGeom.js --post-js JsMaterialXCore/JsDefinition.js --post-js JsMaterialXCore/JsDocument.js --post-js JsMaterialXCore/JsElement.js --post-js JsMaterialXCore/JsInterface.js --post-js JsMaterialXCore/JsLook.js --post-js JsMaterialXCore/JsMaterial.js --post-js JsMaterialXCore/JsNode.js --post-js JsMaterialXCore/JsObserver.js --post-js JsMaterialXCore/JsProperty.js --post-js JsMaterialXCore/JsTraversal.js --post-js JsMaterialXCore/JsUtil.js --post-js JsMaterialXCore/JsValue.js --post-js JsMaterialXCore/JsVariant.js --post-js JsMaterialXFormat/JsXmlIo.js --post-js initMaterialX.js -o ./MaterialXLib.js ")


set_target_properties(jsBindings PROPERTIES LINK_FLAGS ${JS_FLAGS})