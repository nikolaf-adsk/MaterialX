addValidator(function() {
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
            var bindInput = shaderRef.addBindInput('Name', 'Type');
            bindInput.setNodeGraphString('Graph');
            bindInput.hasNodeGraphString();
            bindInput.getNodeGraphString();
            bindInput.setOutputString('Ouput');
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

    validator.classValidatorCb('BindToken', null, function() {
        MaterialX.BindToken.CATEGORY;
    });

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

            shaderRef.addBindParam('Name', 'Type');
            shaderRef.getBindParam('Name');
            shaderRef.getBindParams();
            shaderRef.removeBindParam('Name');
            shaderRef.getBindParams();

            shaderRef.addBindInput('Name', 'Type');
            shaderRef.getBindInput('Name');
            shaderRef.getBindInputs();
            shaderRef.removeBindInput('Name');
            shaderRef.getBindInputs();

            shaderRef.addBindToken('Name');
            shaderRef.getBindToken('Name');
            shaderRef.getBindTokens();
            shaderRef.removeBindToken('Name');
            shaderRef.getBindTokens();

            shaderRef.getReferencedOutputs();
        },
        function() {
            MaterialX.ShaderRef.CATEGORY;
        }
    );

    validator.validate();
});
