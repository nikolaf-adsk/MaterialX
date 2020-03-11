#include "../helpers.h"
#include <MaterialXCore/Look.h>
#include <MaterialXCore/Material.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(material)
    {
        class_<Material, base<Element>>("Material")
            .smart_ptr_constructor("Material", &std::make_shared<Material, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Material>>("Material")
            .function("addShaderRef", &Material::addShaderRef)
            .function("getShaderRef", &Material::getShaderRef)
            .function("getShaderRefs", &Material::getShaderRefs)
            .function("getActiveShaderRefs", &Material::getActiveShaderRefs)
            .function("removeShaderRef", &Material::removeShaderRef)
            .function("getShaderNodeDefs", &Material::getShaderNodeDefs)
            .function("getPrimaryShaderNodeDef", &Material::getPrimaryShaderNodeDef)
            .function("getPrimaryShaderName", &Material::getPrimaryShaderName)
            .function("getPrimaryShaderParameters", &Material::getPrimaryShaderParameters)
            .function("getPrimaryShaderInputs", &Material::getPrimaryShaderInputs)
            .function("getPrimaryShaderTokens", &Material::getPrimaryShaderTokens)
            .function("getGeometryBindings", &Material::getGeometryBindings)
            .class_property("CATEGORY", &Material::CATEGORY);

        class_<BindParam, base<ValueElement>>("BindParam")
            .smart_ptr_constructor("BindParam", &std::make_shared<BindParam, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const BindParam>>("BindParam")
            .class_property("CATEGORY", &BindParam::CATEGORY);

        class_<BindInput, base<ValueElement>>("BindInput")
            .smart_ptr_constructor("BindInput", &std::make_shared<BindInput, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const BindInput>>("BindInput")
            .function("setNodeGraphString", &BindInput::setNodeGraphString)
            .function("hasNodeGraphString", &BindInput::hasNodeGraphString)
            .function("getNodeGraphString", &BindInput::getNodeGraphString)
            .function("setOutputString", &BindInput::setOutputString)
            .function("hasOutputString", &BindInput::hasOutputString)
            .function("getOutputString", &BindInput::getOutputString)
            .function("setConnectedOutput", &BindInput::setConnectedOutput)
            .function("getConnectedOutput", &BindInput::getConnectedOutput)
            .class_property("CATEGORY", &BindInput::CATEGORY);

        class_<BindToken, base<ValueElement>>("BindToken")
            .smart_ptr_constructor("BindToken", &std::make_shared<BindToken, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const BindToken>>("BindToken")
            .class_property("CATEGORY", &BindToken::CATEGORY);

        class_<ShaderRef, base<TypedElement>>("ShaderRef")
            .smart_ptr_constructor("ShaderRef", &std::make_shared<ShaderRef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const ShaderRef>>("ShaderRef")
            .function("setNodeString", &ShaderRef::setNodeString)
            .function("hasNodeString", &ShaderRef::hasNodeString)
            .function("getNodeString", &ShaderRef::getNodeString)
            .function("setNodeDefString", &ShaderRef::setNodeDefString)
            .function("hasNodeDefString", &ShaderRef::hasNodeDefString)
            .function("getNodeDefString", &ShaderRef::getNodeDefString)
            .function("getNodeDef", &ShaderRef::getNodeDef)

            .function("addBindParam", &ShaderRef::addBindParam)
            .function("getBindParam", &ShaderRef::getBindParam)
            .function("getBindParams", &ShaderRef::getBindParams)
            .function("removeBindParam", &ShaderRef::removeBindParam)

            .function("addBindInput", &ShaderRef::addBindInput)
            .function("getBindInput", &ShaderRef::getBindInput)
            .function("getBindInputs", &ShaderRef::getBindInputs)
            .function("removeBindInput", &ShaderRef::removeBindInput)

            .function("addBindToken", &ShaderRef::addBindToken)
            .function("getBindToken", &ShaderRef::getBindToken)
            .function("getBindTokens", &ShaderRef::getBindTokens)
            .function("removeBindToken", &ShaderRef::removeBindToken)
            .function("getReferencedOutputs", &ShaderRef::getReferencedOutputs)
            .class_property("CATEGORY", &ShaderRef::CATEGORY);
    }
}