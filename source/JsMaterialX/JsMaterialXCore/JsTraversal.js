// jsTraversal
addWrapper(function(Module, api) {
    /** Setup the Edge class */
    api.Edge = wrapperFactory(Module.Edge);

    /** Setup the TreeIterator class */
    api.TreeIterator = wrapperFactory(Module.TreeIterator);

    /** Setup the GraphIterator class */
    api.GraphIterator = wrapperFactory(Module.GraphIterator);

    /** Setup the InheritanceIterator class */
    api.InheritanceIterator = wrapperFactory(Module.InheritanceIterator);
});
