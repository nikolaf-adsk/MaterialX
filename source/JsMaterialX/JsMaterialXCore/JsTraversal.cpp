#include "../helpers.h"
#include <MaterialXCore/Traversal.h>

#include <MaterialXCore/Material.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(traversal)
    {
        class_<Edge>("Edge")
            .smart_ptr_constructor("Edge", &std::make_shared<Edge, ElementPtr, ElementPtr, ElementPtr>)
            .function("getDownstreamElement", &Edge::getDownstreamElement)
            .function("getConnectingElement", &Edge::getConnectingElement)
            .function("getUpstreamElement", &Edge::getUpstreamElement)
            .function("getName", &Edge::getName);

        class_<TreeIterator>("TreeIterator")
            .smart_ptr_constructor("TreeIterator", &std::make_shared<TreeIterator, ElementPtr>)

            .function("getElement", &TreeIterator::getElement)
            .function("getElementDepth", &TreeIterator::getElementDepth)
            .function("setPruneSubtree", &TreeIterator::setPruneSubtree)
            .function("getPruneSubtree", &TreeIterator::getPruneSubtree)
            .function("__iter__", optional_override([](TreeIterator &it) -> TreeIterator & {
                return it.begin(1);
            }))
            .function("next", optional_override([](TreeIterator &it) {
                if (++it == it.end())
                    throw Exception("Could not get the next element.");
                return *it;
            }));

        class_<GraphIterator>("GraphIterator")
            .smart_ptr_constructor("GraphIterator", &std::make_shared<GraphIterator, ElementPtr, ConstMaterialPtr>)

            .function("getDownstreamElement", &GraphIterator::getDownstreamElement)
            .function("getConnectingElement", &GraphIterator::getConnectingElement)
            .function("getUpstreamElement", &GraphIterator::getUpstreamElement)
            .function("getUpstreamIndex", &GraphIterator::getUpstreamIndex)
            .function("getElementDepth", &GraphIterator::getElementDepth)
            .function("getNodeDepth", &GraphIterator::getNodeDepth)
            .function("setPruneSubgraph", &GraphIterator::setPruneSubgraph)
            .function("getPruneSubgraph", &GraphIterator::getPruneSubgraph)
            .function("__iter__", optional_override([](GraphIterator &it) -> GraphIterator & {
                return it.begin(1);
            }))
            .function("next", optional_override([](GraphIterator &it) {
                if (++it == it.end())
                    throw Exception("Could not get the next element.");
                    
                return *it;
            }));

        class_<InheritanceIterator>("InheritanceIterator")
            .smart_ptr_constructor("InheritanceIterator", &std::make_shared<InheritanceIterator, ConstElementPtr>)

            .function("__iter__", optional_override([](InheritanceIterator &it) -> InheritanceIterator & {
                return it.begin(1);
            }))
            .function("next", optional_override([](InheritanceIterator &it) {
                if (++it == it.end())
                    throw Exception("Could not get the next element.");
                return *it;
            }));
    }
}