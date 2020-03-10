// jsInterface
addWrapper(function(Module, api) {
    /** Setup the Parameter class */
    api.Parameter = wrapperFactory(Module.Parameter);

    /** Setup the PortElement class */
    api.PortElement = wrapperFactory(Module.PortElement);

    /** Setup the Input class */
    api.Input = wrapperFactory(Module.Input);

    /** Setup the Output class */
    api.Output = wrapperFactory(Module.Output);

    /** Setup the InterfaceElement class */
    api.InterfaceElement = wrapperFactory(Module.InterfaceElement);

    var _addParameter = Module.InterfaceElement.prototype.addParameter;
    api.InterfaceElement.prototype.addParameter = function() {
        var arg1 = arguments[0] || api.DEFAULT_TYPE_STRING;
        var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
        return _addParameter.call(this, arg1, arg2);
    };

    var _addInput = Module.InterfaceElement.prototype.addInput;
    api.InterfaceElement.prototype.addInput = function() {
        var arg1 = arguments[0] || api.DEFAULT_TYPE_STRING;
        var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
        return _addInput.call(this, arg1, arg2);
    };

    var _addOutput = Module.InterfaceElement.prototype.addOutput;
    api.InterfaceElement.prototype.addOutput = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
        return _addOutput.call(this, arg1, arg2);
    };

    var _addToken = Module.InterfaceElement.prototype.addToken;
    api.InterfaceElement.prototype.addToken = function() {
        var arg1 = arguments[0] || '';
        return _addToken.call(this, arg1);
    };

    var _getParameterValue = Module.InterfaceElement.prototype.getParameterValue;
    api.InterfaceElement.prototype.getParameterValue = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || '';
        return _getParameterValue.call(this, arg1, arg2);
    };

    var _getInputValue = Module.InterfaceElement.prototype.getInputValue;
    api.InterfaceElement.prototype.getInputValue = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || '';
        return _getInputValue.call(this, arg1, arg2);
    };

    var _getDeclaration = Module.InterfaceElement.prototype.getDeclaration;
    api.InterfaceElement.prototype.getDeclaration = function() {
        var arg1 = arguments[0] || '';
        return _getDeclaration.call(this, arg1);
    };

    var funcs = [
        'setParameterValueinteger',
        'setParameterValueboolean',
        'setParameterValuefloat',
        'setParameterValuecolor2',
        'setParameterValuecolor3',
        'setParameterValuecolor4',
        'setParameterValuevector2',
        'setParameterValuevector3',
        'setParameterValuevector4',
        'setParameterValuematrix33',
        'setParameterValuematrix44',
        'setParameterValuestring',
        'setParameterValueintegerarray',
        'setParameterValuebooleanarray',
        'setParameterValuefloatarray',
        'setParameterValuestringarray',
        'setInputValueinteger',
        'setInputValueboolean',
        'setInputValuefloat',
        'setInputValuecolor2',
        'setInputValuecolor3',
        'setInputValuecolor4',
        'setInputValuevector2',
        'setInputValuevector3',
        'setInputValuevector4',
        'setInputValuematrix33',
        'setInputValuematrix44',
        'setInputValuestring',
        'setInputValueintegerarray',
        'setInputValuebooleanarray',
        'setInputValuefloatarray',
        'setInputValuestringarray'
    ];

    function iterateFunctionNames(funcNames, cb) {
        for (var i = 0; i < funcNames.length; i++) {
            var name = funcNames[i];
            cb && cb(name);
        }
    }

    /** Setup the typedValue classes */
    iterateFunctionNames(funcs, function(funcName) {
        var _func = Module.InterfaceElement.prototype[funcName];
        api.InterfaceElement.prototype[funcName] = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1];
            var arg3 = arguments[2] || '';
            return _func.call(this, arg1, arg2, arg3);
        };
    });
});
