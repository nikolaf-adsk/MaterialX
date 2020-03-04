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

        class_<GraphElement, base<InterfaceElement>>("GraphElement")
            .smart_ptr_constructor("GraphElement", &std::make_shared<GraphElement, ElementPtr, const string &, const string &>)

            .function("addNode", &GraphElement::addNode)
            .function("addNodeInstance", &GraphElement::addNodeInstance) /** TODO: need to bind Definition.h */
            .function("getNode", &GraphElement::getNode)
            .function("getNodes", &GraphElement::getNodes)
            .function("removeNode", &GraphElement::removeNode)
            .function("addBackdrop", &GraphElement::addBackdrop)
            .function("getBackdrop", &GraphElement::getBackdrop)
            .function("getBackdrops", &GraphElement::getBackdrops)
            .function("removeBackdrop", &GraphElement::removeBackdrop)
            .function("flattenSubgraphs", &GraphElement::flattenSubgraphs)
            .function("topologicalSort", &GraphElement::topologicalSort)
            .function("asStringDot", &GraphElement::asStringDot);

        class_<NodeGraph, base<GraphElement>>("NodeGraph")
            .smart_ptr_constructor("NodeGraph", &std::make_shared<NodeGraph, ElementPtr, const string &>)
            .function("setNodeDef", &NodeGraph::setNodeDef) /** TODO: need to bind Definition.h */
            .function("getNodeDef", &NodeGraph::getNodeDef)
            .class_property("CATEGORY", &NodeGraph::CATEGORY);

        class_<Backdrop, base<Element>>("Backdrop")
            .smart_ptr_constructor("Backdrop", &std::make_shared<Backdrop, ElementPtr, const string &>)
            .function("getContains", &Backdrop::getContains)
            .function("setContains", &Backdrop::setContains)
            .function("getWidth", &Backdrop::getWidth)
            .function("setWidth", &Backdrop::setWidth)
            .function("getHeight", &Backdrop::getHeight)
            .function("setHeight", &Backdrop::setHeight)
            .class_property("CATEGORY", &Backdrop::CATEGORY)
            .class_property("CONTAINS_ATTRIBUTE", &Backdrop::CONTAINS_ATTRIBUTE)
            .class_property("WIDTH_ATTRIBUTE", &Backdrop::WIDTH_ATTRIBUTE)
            .class_property("HEIGHT_ATTRIBUTE", &Backdrop::HEIGHT_ATTRIBUTE);

        register_vector<PortElementPtr>("vector<PortElementPtr>");
        register_vector<NodePtr>("vector<NodePtr>");
        register_vector<BackdropPtr>("vector<BackdropPtr>");
        register_vector<ElementPtr>("vector<ElementPtr>");
    }
}