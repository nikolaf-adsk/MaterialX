#include "../helpers.h"
#include <MaterialXCore/Types.h>
#include <MaterialXCore/Value.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_VECTOR_SUBCLASS(V)                                                                          \
    .function("equals", optional_override([](V &self, const V &rhs) { return self == rhs; }))            \
        .function("not_equals", optional_override([](V &self, const V &rhs) { return self != rhs; }))    \
        .function("add", optional_override([](V &self, const V &rhs) { return self + rhs; }))            \
        .function("sub", optional_override([](V &self, const V &rhs) { return self - rhs; }))            \
        .function("multiply", optional_override([](V &self, const V &rhs) { return self * rhs; }))       \
        .function("divide", optional_override([](V &self, const V &rhs) { return self / rhs; }))         \
        .function("getMagnitude", optional_override([](V &self) { return self.V::getMagnitude(); }))     \
        .function("getNormalized", optional_override([](V &self) { return self.V::getNormalized(); }))   \
        .function("dot", optional_override([](V &self, const V &rhs) { return self.V::dot(rhs); }))      \
        .function("getItem", optional_override([](V &self, size_t i) { return self[i]; }))               \
        .function("setItem", optional_override([](V &self, size_t i, float f) { self[i] = f; }))         \
        .function("toString", optional_override([](const V &self) { return toValueString(self); }))      \
        .function("copy", optional_override([](const V &self) { return V(self); }))                      \
        .function("numElements", optional_override([](const V &self) { return self.V::numElements(); })) \
        .function("length", optional_override([](const V &self) { return self.V::numElements(); }))

#define BIND_MATRIX_SUBCLASS(M)                                                                                                                         \
    .function("equals", optional_override([](M &self, const M &rhs) { return self == rhs; }))                                                           \
        .function("not_equals", optional_override([](M &self, const M &rhs) { return self != rhs; }))                                                   \
        .function("add", optional_override([](M &self, const M &rhs) { return self + rhs; }))                                                           \
        .function("sub", optional_override([](M &self, const M &rhs) { return self - rhs; }))                                                           \
        .function("multiply", optional_override([](M &self, const M &rhs) { return self * rhs; }))                                                      \
        .function("divide", optional_override([](M &self, const M &rhs) { return self / rhs; }))                                                        \
        .function("getItem", optional_override([](M &self, size_t row, size_t col) { return self[row][col]; }))                                         \
        .function("setItem", optional_override([](M &self, size_t row, size_t col, float f) { self[row][col] = f; }))                                   \
        .function("toString", optional_override([](const M &self) { return toValueString(self); }))                                                     \
        .function("copy", optional_override([](const M &self) { return M(self); }))                                                                     \
        .function("isEquivalent", optional_override([](const M &self, const M &rhs, float tolerance) { return self.M::isEquivalent(rhs, tolerance); })) \
        .function("getTranspose", optional_override([](const M &self) { return self.M::getTranspose(); }))                                              \
        .function("getDeterminant", optional_override([](const M &self) { return self.M::getDeterminant(); }))                                          \
        .function("getAdjugate", optional_override([](const M &self) { return self.M::getAdjugate(); }))                                                \
        .function("getInverse", optional_override([](const M &self) { return self.M::getInverse(); }))                                                  \
        .function("numRows", optional_override([](const M &self) { return self.M::numRows(); }))                                                        \
        .function("numColumns", optional_override([](const M &self) { return self.M::numColumns(); }))                                                  \
        .function("length", optional_override([](const M &self) { return self.M::numRows(); }))

extern "C"
{
    EMSCRIPTEN_BINDINGS(types)
    {
        class_<VectorBase>("VectorBase");
        class_<MatrixBase>("MatrixBase");

        class_<Vector2, base<VectorBase>>("Vector2")
            .constructor<>()
            .constructor<float, float>()
                BIND_VECTOR_SUBCLASS(Vector2)
            .function("cross", &Vector2::cross);

        class_<Vector3, base<VectorBase>>("Vector3")
            .constructor<>()
            .constructor<float, float, float>()
                BIND_VECTOR_SUBCLASS(Vector3)
            .function("cross", &Vector2::cross);

        class_<Vector4, base<VectorBase>>("Vector4")
            .constructor<>()
            .constructor<float, float, float, float>()
                BIND_VECTOR_SUBCLASS(Vector4);

        class_<Color2, base<VectorBase>>("Color2")
            .constructor<>()
            .constructor<float, float>()
                BIND_VECTOR_SUBCLASS(Color2);

        class_<Color3, base<VectorBase>>("Color3")
            .constructor<>()
            .constructor<float, float, float>()
                BIND_VECTOR_SUBCLASS(Color3);

        class_<Color4, base<VectorBase>>("Color4")
            .constructor<>()
            .constructor<float, float, float, float>()
                BIND_VECTOR_SUBCLASS(Color4);

        class_<Matrix33, base<MatrixBase>>("Matrix33")
            .constructor<>()
            .constructor<float, float, float, float, float, float, float, float, float>()
                BIND_MATRIX_SUBCLASS(Matrix33)
            .function("createScale", optional_override([](const Matrix33 &self, const Vector2 &v) { return self.Matrix33::createScale(v); }))
            .function("createTranslation", optional_override([](const Matrix33 &self, const Vector2 &v) { return self.Matrix33::createTranslation(v); }))
            .function("multiply", &Matrix33::multiply)
            .function("transformPoint", &Matrix33::transformPoint)
            .function("transformVector", &Matrix33::transformVector)
            .function("transformNormal", &Matrix33::transformNormal)
            .function("createRotation", &Matrix33::createRotation)
            .class_property("IDENTITY", &Matrix33::IDENTITY);

        class_<Matrix44, base<MatrixBase>>("Matrix44")
            .constructor<>()
            .constructor<float, float, float, float, float, float, float, float, float, float, float, float, float, float, float, float>()
                BIND_MATRIX_SUBCLASS(Matrix44)
            .function("createScale", optional_override([](const Matrix44 &self, const Vector3 &v) { return self.Matrix44::createScale(v); }))
            .function("createTranslation", optional_override([](const Matrix44 &self, const Vector3 &v) { return self.Matrix44::createTranslation(v); }))
            .function("multiply", &Matrix44::multiply)
            .function("transformPoint", &Matrix44::transformPoint)
            .function("transformVector", &Matrix44::transformVector)
            .function("transformNormal", &Matrix44::transformNormal)
            .function("createRotationX", &Matrix44::createRotationX)
            .function("createRotationY", &Matrix44::createRotationY)
            .function("createRotationZ", &Matrix44::createRotationZ)
            .class_property("IDENTITY", &Matrix44::IDENTITY);

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