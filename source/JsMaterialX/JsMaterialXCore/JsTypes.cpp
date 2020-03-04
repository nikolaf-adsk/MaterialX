#include "helpers.h"
#include <MaterialXCore/Types.h>
#include <MaterialXCore/Value.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

const string TEST = DEFAULT_TYPE_STRING;
extern "C"
{
    EMSCRIPTEN_BINDINGS(types)
    {
        function("DEFAULT_TYPE_STRING", optional_override([]() {
                     return DEFAULT_TYPE_STRING;
                 }));
        function("FILENAME_TYPE_STRING", optional_override([]() {
                     return FILENAME_TYPE_STRING;
                 }));
        function("GEOMNAME_TYPE_STRING", optional_override([]() {
                     return GEOMNAME_TYPE_STRING;
                 }));
        function("SURFACE_SHADER_TYPE_STRING", optional_override([]() {
                     return SURFACE_SHADER_TYPE_STRING;
                 }));
        function("DISPLACEMENT_SHADER_TYPE_STRING", optional_override([]() {
                     return DISPLACEMENT_SHADER_TYPE_STRING;
                 }));
        function("VOLUME_SHADER_TYPE_STRING", optional_override([]() {
                     return VOLUME_SHADER_TYPE_STRING;
                 }));
        function("LIGHT_SHADER_TYPE_STRING", optional_override([]() {
                     return LIGHT_SHADER_TYPE_STRING;
                 }));
        function("MULTI_OUTPUT_TYPE_STRING", optional_override([]() {
                     return MULTI_OUTPUT_TYPE_STRING;
                 }));
        function("NONE_TYPE_STRING", optional_override([]() {
                     return NONE_TYPE_STRING;
                 }));
        function("VALUE_STRING_TRUE", optional_override([]() {
                     return VALUE_STRING_TRUE;
                 }));
        function("VALUE_STRING_FALSE", optional_override([]() {
                     return VALUE_STRING_FALSE;
                 }));
        function("NAME_PREFIX_SEPARATOR", optional_override([]() {
                     return NAME_PREFIX_SEPARATOR;
                 }));
        function("NAME_PATH_SEPARATOR", optional_override([]() {
                     return NAME_PATH_SEPARATOR;
                 }));
        function("ARRAY_VALID_SEPARATORS", optional_override([]() {
                     return ARRAY_VALID_SEPARATORS;
                 }));
        function("ARRAY_PREFERRED_SEPARATOR", optional_override([]() {
                     return ARRAY_PREFERRED_SEPARATOR;
                 }));
    }
}