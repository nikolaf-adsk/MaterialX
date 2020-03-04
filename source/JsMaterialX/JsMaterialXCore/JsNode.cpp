#include "helpers.h"
#include <MaterialXCore/Node.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(node)
    {
        class_<Node, base<InterfaceElement>>("Node")
            .smart_ptr_constructor("Node", &std::make_shared<Node, ElementPtr, const string &>)

            .function("setConnectedNode", &Node::setConnectedNode)
            .function("getConnectedNode", &Node::getConnectedNode)
            .function("setConnectedNodeName", &Node::setConnectedNodeName)
            .function("getConnectedNodeName", &Node::getConnectedNodeName)
            .function("getNodeDef", &Node::getNodeDef) /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX7NodeDefEEE" */
            .function("getImplementation", &Node::getImplementation)
            .function("getDownstreamPorts", &Node::getDownstreamPorts)
            .class_property("CATEGORY", &Node::CATEGORY);

        // class_<GraphElement, base<InterfaceElement>>("GraphElement")
        //     .smart_ptr_constructor("GraphElement", &std::make_shared<GraphElement, ElementPtr, const string &, const string &>)

        //     .function("_addNode", &GraphElement::addNode,
        //               arg("category"), arg("name") = EMPTY_STRING, arg("type") = DEFAULT_TYPE_STRING)
        //     .function("addNodeInstance", &GraphElement::addNodeInstance,
        //               arg("nodeDef"), arg("name") = EMPTY_STRING)
        //     // .function("getNode", &GraphElement::getNode)
        //     // .function("getNodes", &GraphElement::getNodes,
        //     //      arg("category") = EMPTY_STRING)
        //     // .function("removeNode", &GraphElement::removeNode)
        //     // .function("addBackdrop", &GraphElement::addBackdrop,
        //     //      arg("name") = EMPTY_STRING)
        //     // .function("getBackdrop", &GraphElement::getBackdrop)
        //     // .function("getBackdrops", &GraphElement::getBackdrops)
        //     // .function("removeBackdrop", &GraphElement::removeBackdrop)
        //     // .function("flattenSubgraphs", &GraphElement::flattenSubgraphs,
        //     //      arg("target") = EMPTY_STRING)
        //     // .function("topologicalSort", &GraphElement::topologicalSort)
        //     // .function("asStringDot", &GraphElement::asStringDot)
        //     ;
        register_vector<PortElementPtr>("vector<PortElementPtr>");
    }
}