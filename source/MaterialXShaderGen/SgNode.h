#ifndef MATERIALX_SGNODE_H
#define MATERIALX_SGNODE_H

#include <MaterialXCore/Node.h>

#include <MaterialXShaderGen/NodeImplementation.h>

namespace MaterialX
{

using SgNodePtr = shared_ptr<class SgNode>;

/// Caches required node data for shader generation.
class SgNode
{
public:
    SgNode(NodePtr node, const string& language, const string& target);

    /// Return the name of this node.
    const string& getName() const
    {
        return _node->getName();
    }

    /// Return this node.
    const Node& getNode() const
    {
        return *_node;
    }

    /// Return the nodedef for this node.
    const NodeDef& getNodeDef() const
    {
        return *_nodeDef;
    }

    /// Return a port (input or parameter) with the given name
    /// If the port is not created on the node the port on the
    /// nodedef will be returned instead.
    /// Throws exception if no port is found.
    const ValueElement& getPort(const string& name) const;

    /// Return the custom implementation used for this node,
    /// or nullptr if the node is not using a custom implementation.
    const NodeImplementationPtr& getCustomImpl() const
    {
        return _customImpl;
    }

    /// Return true if this node is using an inlined implementation.
    bool getInlined() const
    {
        return _inlined;
    }

    /// Return the function name for this node.
    const string& getFunctionName() const
    {
        return _functionName;
    }

    /// Return the function source code for this node.
    const string& getFunctionSource() const
    {
        return _functionSource;
    }

    /// Return the source code implementation element for the given nodedef and language/target,
    /// or nullptr if no matching implemenation is found.
    static ImplementationPtr getSourceCodeImplementation(const NodeDef& nodeDef, const string& language, const string& target);

private:
    NodePtr _node;
    NodeDefPtr _nodeDef;
    NodeImplementationPtr _customImpl;
    bool _inlined;
    string _functionName;
    string _functionSource;
};


} // namespace MaterialX

#endif
