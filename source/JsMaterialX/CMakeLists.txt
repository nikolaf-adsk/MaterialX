set(OUTPUT_CORE ${CMAKE_CURRENT_SOURCE_DIR}/JsMaterialXCore/)
set(OUTPUT_FORMAT ${CMAKE_CURRENT_SOURCE_DIR}/JsMaterialXFormat/)
set(OUTPUT_LIBS ${CMAKE_CURRENT_SOURCE_DIR}/_build/source/)

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

set(LIB_DEPS ${OUTPUT_LIBS}MaterialXCore/libMaterialXCore.a ${OUTPUT_LIBS}MaterialXFormat/libMaterialXFormat.a)

add_executable(MaterialXLib MaterialXLib.cpp)

target_link_libraries(MaterialXLib ${CORE_DEPS} ${FORMAT_DEPS} ${LIB_DEPS})

set(JS_FLAGS "-I${CMAKE_CURRENT_SOURCE_DIR}/../ -std=c++17 -s WASM=1 -s DISABLE_EXCEPTION_CATCHING=0 -s MODULARIZE=1 -s EXPORT_ES6=1 -s USE_ES6_IMPORT_META=0 ")

string(APPEND JS_FLAGS "--post-js ${OUTPUT_CORE}JsTypes.js --post-js ${OUTPUT_CORE}JsGeom.js --post-js ${OUTPUT_CORE}JsDefinition.js --post-js ${OUTPUT_CORE}JsDocument.js --post-js ${OUTPUT_CORE}JsElement.js --post-js ${OUTPUT_CORE}JsInterface.js --post-js ${OUTPUT_CORE}JsLook.js --post-js ${OUTPUT_CORE}JsMaterial.js --post-js ${OUTPUT_CORE}JsNode.js --post-js ${OUTPUT_CORE}JsObserver.js --post-js ${OUTPUT_CORE}JsProperty.js --post-js ${OUTPUT_CORE}JsTraversal.js --post-js ${OUTPUT_CORE}JsUtil.js --post-js ${OUTPUT_CORE}JsValue.js --post-js ${OUTPUT_CORE}JsVariant.js --post-js ${OUTPUT_FORMAT}JsXmlIo.js --post-js ${CMAKE_CURRENT_SOURCE_DIR}/initMaterialX.js ")
string(APPEND JS_FLAGS "-s MEMORY_GROWTH_LINEAR_STEP=32MB -s ALLOW_MEMORY_GROWTH=1 ")

if (CMAKE_BUILD_TYPE MATCHES Debug)
    message("JS: Building Debug")
    string(APPEND JS_FLAGS "--bind ")
else()
    message("JS: Building Release")
    string(APPEND JS_FLAGS "-Os --bind ")
endif()


set_target_properties(MaterialXLib PROPERTIES LINK_FLAGS ${JS_FLAGS})