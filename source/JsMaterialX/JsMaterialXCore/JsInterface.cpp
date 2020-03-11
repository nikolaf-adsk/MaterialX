#include "../helpers.h"
#include <MaterialXCore/Interface.h>
#include <MaterialXCore/Node.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_INTERFACE_TYPE_INSTANCE(NAME, T)                                 \
.function("setParameterValue" #NAME, &InterfaceElement::setParameterValue<T>) \
.function("setInputValue" #NAME, &InterfaceElement::setInputValue<T>)

extern "C"
{
    EMSCRIPTEN_BINDINGS(interface)
    {

        class_<Parameter, base<ValueElement>>("Parameter")
            .smart_ptr_constructor("Parameter", &std::make_shared<Parameter, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Parameter>>("Parameter")
            .class_property("CATEGORY", &Parameter::CATEGORY);

        class_<PortElement, base<ValueElement>>("PortElement")
            .smart_ptr<std::shared_ptr<PortElement>>("PortElement")
            .smart_ptr<std::shared_ptr<const PortElement>>("PortElement")
            .function("setNodeName", &PortElement::setNodeName)
            .function("getNodeName", &PortElement::getNodeName)
            .function("setChannels", &PortElement::setChannels)
            .function("getChannels", &PortElement::getChannels)
            .function("setConnectedNode", &PortElement::setConnectedNode)
            .function("getConnectedNode", &PortElement::getConnectedNode);

        class_<Input, base<PortElement>>("Input")
            .smart_ptr_constructor("Input", &std::make_shared<Input, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Input>>("Input")
            .function("setDefaultGeomPropString", &Input::setDefaultGeomPropString)
            .function("hasDefaultGeomPropString", &Input::hasDefaultGeomPropString)
            .function("getDefaultGeomPropString", &Input::getDefaultGeomPropString)
            .function("getDefaultGeomProp", &Input::getDefaultGeomProp)
            .class_property("CATEGORY", &Input::CATEGORY);

        class_<Output, base<PortElement>>("Output")
            .smart_ptr_constructor("Output", &std::make_shared<Output, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Output>>("Output")
            .function("hasUpstreamCycle", &Output::hasUpstreamCycle)
            .class_property("CATEGORY", &Output::CATEGORY)
            .class_property("DEFAULT_INPUT_ATTRIBUTE", &Output::DEFAULT_INPUT_ATTRIBUTE);

        class_<InterfaceElement, base<TypedElement>>("InterfaceElement")
            .smart_ptr<std::shared_ptr<InterfaceElement>>("InterfaceElement")
            .smart_ptr<std::shared_ptr<const InterfaceElement>>("InterfaceElement")
            .function("setNodeDefString", &InterfaceElement::setNodeDefString)
            .function("hasNodeDefString", &InterfaceElement::hasNodeDefString)
            .function("getNodeDefString", &InterfaceElement::getNodeDefString)
            .function("addParameter", &InterfaceElement::addParameter)

            .function("getParameter", &InterfaceElement::getParameter)
            .function("getParameters", &InterfaceElement::getParameters)
            .function("getParameterCount", &InterfaceElement::getParameterCount)
            .function("removeParameter", &InterfaceElement::removeParameter)
            .function("getActiveParameter", &InterfaceElement::getActiveParameter)
            .function("getActiveParameters", &InterfaceElement::getActiveParameters)
            .function("addInput", &InterfaceElement::addInput)
            .function("getInput", &InterfaceElement::getInput)
            .function("getInputs", &InterfaceElement::getInputs)
            .function("getInputCount", &InterfaceElement::getInputCount)
            .function("removeInput", &InterfaceElement::removeInput)
            .function("getActiveInput", &InterfaceElement::getActiveInput)
            .function("getActiveInputs", &InterfaceElement::getActiveInputs)
            .function("addOutput", &InterfaceElement::addOutput)
            .function("getOutput", &InterfaceElement::getOutput)
            .function("getOutputs", &InterfaceElement::getOutputs)
            .function("getOutputCount", &InterfaceElement::getOutputCount)
            .function("removeOutput", &InterfaceElement::removeOutput)
            .function("getActiveOutput", &InterfaceElement::getActiveOutput)
            .function("getActiveOutputs", &InterfaceElement::getActiveOutputs)

            .function("addToken", &InterfaceElement::addToken)
            .function("getToken", &InterfaceElement::getToken)
            .function("getTokens", &InterfaceElement::getTokens)
            .function("removeToken", &InterfaceElement::removeToken)
            .function("getActiveToken", &InterfaceElement::getActiveToken)
            .function("getActiveTokens", &InterfaceElement::getActiveTokens)

            .function("getActiveValueElement", &InterfaceElement::getActiveValueElement)
            .function("getActiveValueElements", &InterfaceElement::getActiveValueElements)
            .function("getParameterValue", &InterfaceElement::getParameterValue)
            .function("getInputValue", &InterfaceElement::getInputValue)

            .function("setTokenValue", &InterfaceElement::setTokenValue)
            .function("getTokenValue", &InterfaceElement::getTokenValue)
            .function("getDeclaration", &InterfaceElement::getDeclaration)
            .function("isTypeCompatible", &InterfaceElement::isTypeCompatible)
            BIND_INTERFACE_TYPE_INSTANCE(integer, int)
            BIND_INTERFACE_TYPE_INSTANCE(boolean, bool)
            BIND_INTERFACE_TYPE_INSTANCE(float, float)
            BIND_INTERFACE_TYPE_INSTANCE(color2, Color2)
            BIND_INTERFACE_TYPE_INSTANCE(color3, Color3)
            BIND_INTERFACE_TYPE_INSTANCE(color4, Color4)
            BIND_INTERFACE_TYPE_INSTANCE(vector2, Vector2)
            BIND_INTERFACE_TYPE_INSTANCE(vector3, Vector3)
            BIND_INTERFACE_TYPE_INSTANCE(vector4, Vector4)
            BIND_INTERFACE_TYPE_INSTANCE(matrix33, Matrix33)
            BIND_INTERFACE_TYPE_INSTANCE(matrix44, Matrix44)
            BIND_INTERFACE_TYPE_INSTANCE(string, std::string)
            BIND_INTERFACE_TYPE_INSTANCE(integerarray, IntVec)
            BIND_INTERFACE_TYPE_INSTANCE(booleanarray, BoolVec)
            BIND_INTERFACE_TYPE_INSTANCE(floatarray, FloatVec)
            BIND_INTERFACE_TYPE_INSTANCE(stringarray, StringVec)

            .class_property("NODE_DEF_ATTRIBUTE", &InterfaceElement::NODE_DEF_ATTRIBUTE);
    }
}