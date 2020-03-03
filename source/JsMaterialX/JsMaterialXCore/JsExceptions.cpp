#include <string>
#include <emscripten.h>
#include <emscripten/bind.h>

namespace exceptions
{
std::string getExceptionMessage(int exceptionPtr)
{
    return std::string(reinterpret_cast<std::exception *>(exceptionPtr)->what());
}
} // namespace exceptions

extern "C"
{
    EMSCRIPTEN_BINDINGS(exceptions)
    {
        emscripten::function("getExceptionMessage", &exceptions::getExceptionMessage);
    }
}