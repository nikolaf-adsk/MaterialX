#include "helpers.h"
#include <MaterialXCore/Document.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(document)
    {
        function("createDocument", &createDocument);
    }
}