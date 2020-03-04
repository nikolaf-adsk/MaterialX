#include "helpers.h"
#include <MaterialXCore/Node.h>
#include <MaterialXCore/Util.h>

#include <MaterialXFormat/File.h>
#include <iostream>
#include <vector>
#include <iterator>
#include <map>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

// For reference.
// EM_JS(void, call_something, (string a), {
//     console.log("HELLO", a);
// });

extern "C"
{
    EMSCRIPTEN_BINDINGS(my_module)
    {
        function("getVersionString", &getVersionString);
        function("createValidName", &createValidName); // arg0 === {string}, arg1 === {unicode representing character}
        function("makeVersionString", &makeVersionString);
        function("isValidName", &isValidName);
        function("incrementName", &incrementName);

        // The following function throw: Cannot call {function name} due to unbound types: XXXXX
        function("getVersionIntegers", optional_override([]() {
                     std::tuple<int, int, int> version = getVersionIntegers();
                     return arrayToVec((int *)&version, 3);
                 }));

        function("splitString", optional_override([](string str, string sep) {
                     const string &str1 = str;
                     const string &sep2 = sep;
                     return splitString(str1, sep2);
                 }));

        function("replaceSubstrings", optional_override([](string str, val newValue) {
                     mx::StringMap separatorMapper;
                     val keys = val::global("Object").call<val>("keys", newValue);
                     int length = keys["length"].as<int>();
                     for (int i = 0; i < length; ++i)
                     {
                         string key = keys[i].as<string>().c_str();
                         string value = newValue[key].as<string>();
                         separatorMapper[key] = value;
                     }
                     return replaceSubstrings(str, separatorMapper);
                 }));

        function("prettyPrint", &prettyPrint);

        register_vector<string>("vector<string>");
        register_vector<int>("vector<int>");
    }
}