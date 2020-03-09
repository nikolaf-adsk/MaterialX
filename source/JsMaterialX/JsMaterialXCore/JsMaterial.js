var JsMaterial = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Material class */
        api.Material = wrapperFactory(Module.Material);

        var _addShaderRef = Module.Material.prototype.addShaderRef;
        api.Material.prototype.addShaderRef = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _addShaderRef.call(this, arg1, arg2);
        };

        var _getShaderRefs = Module.Material.prototype.getShaderRefs;
        api.Material.prototype.getShaderRefs = function() {
            var vec = _getShaderRefs.call(this);
            return vecToArray(vec);
        };

        var _getActiveShaderRefs = Module.Material.prototype.getActiveShaderRefs;
        api.Material.prototype.getActiveShaderRefs = function() {
            var vec = _getActiveShaderRefs.call(this);
            return vecToArray(vec);
        };

        var _getShaderNodeDefs = Module.Material.prototype.getShaderNodeDefs;
        api.Material.prototype.getShaderNodeDefs = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            var vec = _getShaderNodeDefs.call(this, arg1, arg2);
            return vecToArray(vec);
        };

        var _getPrimaryShaderNodeDef = Module.Material.prototype.getPrimaryShaderNodeDef;
        api.Material.prototype.getPrimaryShaderNodeDef = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _getPrimaryShaderNodeDef.call(this, arg1, arg2);
        };

        var _getPrimaryShaderName = Module.Material.prototype.getPrimaryShaderName;
        api.Material.prototype.getPrimaryShaderName = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _getPrimaryShaderName.call(this, arg1, arg2);
        };

        var _getPrimaryShaderParameters = Module.Material.prototype.getPrimaryShaderParameters;
        api.Material.prototype.getPrimaryShaderParameters = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            var vec = _getPrimaryShaderParameters.call(this, arg1, arg2);
            return vecToArray(vec);
        };

        var _getPrimaryShaderInputs = Module.Material.prototype.getPrimaryShaderInputs;
        api.Material.prototype.getPrimaryShaderInputs = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            var vec = _getPrimaryShaderInputs.call(this, arg1, arg2);
            return vecToArray(vec);
        };

        var _getPrimaryShaderTokens = Module.Material.prototype.getPrimaryShaderTokens;
        api.Material.prototype.getPrimaryShaderTokens = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            var vec = _getPrimaryShaderTokens.call(this, arg1, arg2);
            return vecToArray(vec);
        };

        var _getGeometryBindings = Module.Material.prototype.getGeometryBindings;
        api.Material.prototype.getGeometryBindings = function() {
            var arg1 = arguments[0] || api.UNIVERSAL_GEOM_NAME;
            var vec = _getGeometryBindings.call(this, arg1);
            return vecToArray(vec);
        };

        /** Setup the BindParam class */
        api.BindParam = wrapperFactory(Module.BindParam);

        /** Setup the BindInput class */
        api.BindInput = wrapperFactory(Module.BindInput);

        /** Setup the BindToken class */
        api.BindToken = wrapperFactory(Module.BindToken);

        /** Setup the ShaderRef class */
        api.ShaderRef = wrapperFactory(Module.ShaderRef);

        var _addBindParam = Module.ShaderRef.prototype.addBindParam;
        api.ShaderRef.prototype.addBindParam = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || MaterialX.DEFAULT_TYPE_STRING;
            return _addBindParam.call(this, arg1, arg2);
        };

        var _getBindParams = Module.ShaderRef.prototype.getBindParams;
        api.ShaderRef.prototype.getBindParams = function() {
            var vec = _getBindParams.call(this);
            return vecToArray(vec);
        };

        var _addBindInput = Module.ShaderRef.prototype.addBindInput;
        api.ShaderRef.prototype.addBindInput = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || MaterialX.DEFAULT_TYPE_STRING;
            return _addBindInput.call(this, arg1, arg2);
        };

        var _getBindInputs = Module.ShaderRef.prototype.getBindInputs;
        api.ShaderRef.prototype.getBindInputs = function() {
            var vec = _getBindInputs.call(this);
            return vecToArray(vec);
        };

        var _getBindTokens = Module.ShaderRef.prototype.getBindTokens;
        api.ShaderRef.prototype.getBindTokens = function() {
            var vec = _getBindTokens.call(this);
            return vecToArray(vec);
        };

        var _getReferencedOutputs = Module.ShaderRef.prototype.getReferencedOutputs;
        api.ShaderRef.prototype.getReferencedOutputs = function() {
            var vec = _getReferencedOutputs.call(this);
            return vecToArray(vec);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsMaterial.js');

        validator.classValidatorCb(
            'Material',
            function() {
                var doc = MaterialX.createDocument();
                var material = doc.addMaterial('MATERIAL');
                material.addShaderRef('Shader', 'Ref');
                material.getShaderRef('Shader');
                material.getShaderRefs();
                material.getActiveShaderRefs();
                material.removeShaderRef('Shader');
                material.getShaderRefs();

                material.getShaderNodeDefs();
                material.getPrimaryShaderNodeDef();
                material.getPrimaryShaderName();
                material.getPrimaryShaderParameters();
                material.getPrimaryShaderName();
                material.getPrimaryShaderParameters();
                material.getPrimaryShaderInputs();
                material.getPrimaryShaderTokens();
                material.getGeometryBindings();
            },
            function() {
                MaterialX.Material.CATEGORY;
            }
        );

        validator.classValidatorCb('BindParam', null, function() {
            MaterialX.BindParam.CATEGORY;
        });

        validator.classValidatorCb(
            'BindInput',
            function() {
                var doc = MaterialX.createDocument();
                var material = doc.addMaterial('MATERIAL2');
                var shaderRef = material.addShaderRef('Shader2', 'Ref2');
                var bindInput = shaderRef.addBindInput("Name", "Type");
                bindInput.setNodeGraphString("Graph");
                bindInput.hasNodeGraphString();
                bindInput.getNodeGraphString();
                bindInput.setOutputString("Ouput");
                bindInput.hasOutputString();
                bindInput.getOutputString();
                var output = doc.addOutput();
                bindInput.setConnectedOutput(output);
                bindInput.getConnectedOutput();

            },
            function() {
                MaterialX.BindInput.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'BindToken', null,
            function() {
                MaterialX.BindToken.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'ShaderRef',
            function() {
                var doc = MaterialX.createDocument();
                var material = doc.addMaterial('MATERIAL1');
                var shaderRef = material.addShaderRef('Shader1', 'Ref1');
                shaderRef.setNodeString('NodeString');
                shaderRef.hasNodeString();
                shaderRef.getNodeString();

                shaderRef.setNodeDefString('NodeDefString');
                shaderRef.getNodeDefString();
                shaderRef.getNodeDef();

                shaderRef.addBindParam("Name", "Type");
                shaderRef.getBindParam("Name");
                shaderRef.getBindParams();
                shaderRef.removeBindParam("Name");
                shaderRef.getBindParams();

                shaderRef.addBindInput("Name", "Type");
                shaderRef.getBindInput("Name");
                shaderRef.getBindInputs();
                shaderRef.removeBindInput("Name");
                shaderRef.getBindInputs();

                shaderRef.addBindToken("Name");
                shaderRef.getBindToken("Name");
                shaderRef.getBindTokens();
                shaderRef.removeBindToken("Name");
                shaderRef.getBindTokens();

                shaderRef.getReferencedOutputs();
            },
            function() {
                MaterialX.ShaderRef.CATEGORY;
            }
        );

        validator.validate();
    }
};
