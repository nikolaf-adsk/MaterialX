#include "helpers.h"
#include <MaterialXCore/Interface.h>
#include <MaterialXCore/Node.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(interface)
    {

        class_<Parameter, base<ValueElement>>("Parameter")
            .smart_ptr_constructor("Parameter", &std::make_shared<Parameter, ElementPtr, const string &>)
            // .constructor<ElementPtr, const string &>()
            // .smart_ptr<std::shared_ptr<Parameter>>("Parameter")
            .smart_ptr<std::shared_ptr<const Parameter>>("Parameter")
            .class_property("CATEGORY", &Parameter::CATEGORY);

        class_<PortElement, base<ValueElement>>("PortElement")
            .smart_ptr_constructor("PortElement", &std::make_shared<PortElement, ElementPtr, const string &, const string &>)
            // .constructor<ElementPtr, const string &, const string &>()
            // .smart_ptr<std::shared_ptr<PortElement>>("PortElement")
            .smart_ptr<std::shared_ptr<const PortElement>>("PortElement")
            .function("setNodeName", &PortElement::setNodeName)
            .function("getNodeName", &PortElement::getNodeName)
            .function("setChannels", &PortElement::setChannels)
            .function("getChannels", &PortElement::getChannels)
            .function("setConnectedNode", &PortElement::setConnectedNode)  /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX4NodeEEE*/
            .function("getConnectedNode", &PortElement::getConnectedNode); /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX4NodeEEE" */

        class_<Input, base<PortElement>>("Input")
            .smart_ptr_constructor("Input", &std::make_shared<Input, ElementPtr, const string &>)

            // .constructor<ElementPtr, const string &>()
            // .smart_ptr<std::shared_ptr<Input>>("Input")
            .smart_ptr<std::shared_ptr<const Input>>("Input")
            .function("setDefaultGeomPropString", &Input::setDefaultGeomPropString)
            .function("hasDefaultGeomPropString", &Input::hasDefaultGeomPropString)
            .function("getDefaultGeomPropString", &Input::getDefaultGeomPropString)
            .function("getDefaultGeomProp", &Input::getDefaultGeomProp) /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX11GeomPropDefEEE" */
            .class_property("CATEGORY", &Input::CATEGORY);

        class_<Output, base<PortElement>>("Output")
            .smart_ptr_constructor("Output", &std::make_shared<Output, ElementPtr, const string &>)
            // .constructor<ElementPtr, const string &>()
            // .smart_ptr<std::shared_ptr<Output>>("Output")
            .smart_ptr<std::shared_ptr<const Output>>("Output")
            .function("hasUpstreamCycle", &Output::hasUpstreamCycle)
            .class_property("CATEGORY", &Output::CATEGORY)
            .class_property("DEFAULT_INPUT_ATTRIBUTE", &Output::DEFAULT_INPUT_ATTRIBUTE);

        class_<InterfaceElement, base<TypedElement>>("InterfaceElement")
            .smart_ptr_constructor("InterfaceElement", &std::make_shared<InterfaceElement, ElementPtr, const string &, const string &>)
            // .constructor<ElementPtr, const string &, const string &>()
            // .smart_ptr<std::shared_ptr<InterfaceElement>>("InterfaceElement")
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
            .function("getParameterValue", &InterfaceElement::getParameterValue) /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX5ValueEEE" */
            .function("getInputValue", &InterfaceElement::getInputValue)         /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX5ValueEEE" */

            .function("setTokenValue", &InterfaceElement::setTokenValue)
            .function("getTokenValue", &InterfaceElement::getTokenValue)
            .function("getDeclaration", &InterfaceElement::getDeclaration) /** TODO: unbound types: NSt3__210shared_ptrIKN9MaterialX7NodeDefEEE" */
            .function("isTypeCompatible", &InterfaceElement::isTypeCompatible)

            .class_property("NODE_DEF_ATTRIBUTE", &InterfaceElement::NODE_DEF_ATTRIBUTE);

        register_vector<ParameterPtr>("vector<ParameterPtr>");
        register_vector<InputPtr>("vector<InputPtr>");
        register_vector<OutputPtr>("vector<OutputPtr>");
        register_vector<TokenPtr>("vector<TokenPtr>");
        register_vector<ValueElementPtr>("vector<ValueElementPtr>");
    }
}