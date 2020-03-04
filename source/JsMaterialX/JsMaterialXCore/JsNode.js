var JsNode = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Parameter class */
        api.Node = wrapperFactory(Module.Node);

        var _getNodeDef = Module.Node.prototype.getNodeDef;
        api.Node.prototype.getNodeDef = function() {
            var arg1 = arguments[0] || '';
            return _getNodeDef.call(this, arg1);
        };

        var _getImplementation = Module.Node.prototype.getImplementation;
        api.Node.prototype.getImplementation = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _getImplementation.call(this, arg1, arg2);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsNode.js');
        validator.classValidatorCb(
            'Node',
            function() {
                var node = new MaterialX.Node(null, 'Node1');
                // node.setConnectedNode("name", NodePtr);
                node.getConnectedNode('name');
                node.setConnectedNodeName('inputname', 'Node1');
                node.getConnectedNodeName('inputname');
                // node.getNodeDef("name");
                node.getImplementation('target', 'java');
                node.getDownstreamPorts();
            },
            function() {
                MaterialX.Node.CATEGORY;
            }
        );
        validator.validate();
    }
};
