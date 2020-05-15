#include "../helpers.h"
#include <MaterialXCore/Value.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_TYPE_INSTANCE(NAME, T)                                                   \
    class_<TypedValue<T>, base<Value>>("TypedValue_" #NAME) \
        .smart_ptr<std::shared_ptr<TypedValue<T>>>("TypedValue<T>")                         \
        .function("getData", &TypedValue<T>::getData)                                 \
        .function("getValueString", &TypedValue<T>::getValueString)                   \
        .class_function("createValue", &Value::createValue<T>)                        \
        .class_property("TYPE", &TypedValue<T>::TYPE);

extern "C"
{
    EMSCRIPTEN_BINDINGS(value)
    {
        class_<Value>("Value")
            .smart_ptr<std::shared_ptr<Value>>("Value")
            .smart_ptr<std::shared_ptr<const Value>>("Value")
            .function("getValueString", &Value::getValueString)
            .function("getTypeString", &Value::getTypeString)
            .class_function("createValueFromStrings", &Value::createValueFromStrings);

        BIND_TYPE_INSTANCE(integer, int)
        BIND_TYPE_INSTANCE(boolean, bool)
        BIND_TYPE_INSTANCE(float, float)
        BIND_TYPE_INSTANCE(color2, Color2)
        BIND_TYPE_INSTANCE(color3, Color3)
        BIND_TYPE_INSTANCE(color4, Color4)
        BIND_TYPE_INSTANCE(vector2, Vector2)
        BIND_TYPE_INSTANCE(vector3, Vector3)
        BIND_TYPE_INSTANCE(vector4, Vector4)
        BIND_TYPE_INSTANCE(matrix33, Matrix33)
        BIND_TYPE_INSTANCE(matrix44, Matrix44)
        BIND_TYPE_INSTANCE(string, std::string)
        BIND_TYPE_INSTANCE(integerarray, IntVec)
        BIND_TYPE_INSTANCE(booleanarray, BoolVec)
        BIND_TYPE_INSTANCE(floatarray, FloatVec)
        BIND_TYPE_INSTANCE(stringarray, StringVec)
    }
}