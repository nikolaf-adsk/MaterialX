#include "../helpers.h"
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
            .smart_ptr<std::shared_ptr<const Node>>("Node")
            .function("setConnectedNode", &Node::setConnectedNode)
            .function("getConnectedNode", &Node::getConnectedNode)
            .function("setConnectedNodeName", &Node::setConnectedNodeName)
            .function("getConnectedNodeName", &Node::getConnectedNodeName)
            .function("getNodeDef", &Node::getNodeDef)
            .function("getImplementation", &Node::getImplementation)
            .function("getDownstreamPorts", &Node::getDownstreamPorts)
            .class_property("CATEGORY", &Node::CATEGORY);

        class_<GraphElement, base<InterfaceElement>>("GraphElement")
            .smart_ptr<std::shared_ptr<GraphElement>>("GraphElement")
            .smart_ptr<std::shared_ptr<const GraphElement>>("GraphElement")
            .function("addNode", &GraphElement::addNode)
            .function("addNodeInstance", &GraphElement::addNodeInstance)
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
            .smart_ptr<std::shared_ptr<const NodeGraph>>("NodeGraph")
            .function("setNodeDef", &NodeGraph::setNodeDef)
            .function("getNodeDef", &NodeGraph::getNodeDef)
            .class_property("CATEGORY", &NodeGraph::CATEGORY);

        class_<Backdrop, base<Element>>("Backdrop")
            .smart_ptr_constructor("Backdrop", &std::make_shared<Backdrop, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Backdrop>>("Backdrop")
            .function("setContainsString", &Backdrop::setContainsString)
            .function("hasContainsString", &Backdrop::hasContainsString)
            .function("getContainsString", &Backdrop::getContainsString)
            .function("setWidth", &Backdrop::setWidth)
            .function("hasWidth", &Backdrop::hasWidth)
            .function("getWidth", &Backdrop::getWidth)
            .function("setHeight", &Backdrop::setHeight)
            .function("hasHeight", &Backdrop::hasHeight)
            .function("getHeight", &Backdrop::getHeight)
            .function("setContainsElements", &Backdrop::setContainsElements)
            .function("getContainsElements", &Backdrop::getContainsElements)
            .class_property("CATEGORY", &Backdrop::CATEGORY)
            .class_property("CONTAINS_ATTRIBUTE", &Backdrop::CONTAINS_ATTRIBUTE)
            .class_property("WIDTH_ATTRIBUTE", &Backdrop::WIDTH_ATTRIBUTE)
            .class_property("HEIGHT_ATTRIBUTE", &Backdrop::HEIGHT_ATTRIBUTE);
    }
}