// jsElement
addWrapper(function(Module, api) {
    /** Setup the CopyOptions class */
    api.CopyOptions = Module.CopyOptions;

    /** Setup the Element class */
    api.Element = wrapperFactory(Module.Element);

    var _getVersionIntegers = Module.Element.prototype.getVersionIntegers;
    api.Element.prototype.getVersionIntegers = function() {
        // The version vector needs to be changed into an array.
        var vec = _getVersionIntegers.call(this);
        return vecToArray(vec);
    };

    var _getNamePath = Module.Element.prototype.getNamePath;
    api.Element.prototype.getNamePath = function() {
        var arg1 = arguments[0] || null;
        return _getNamePath.call(this, arg1);
    };

    var _addChildOfCategory = Module.Element.prototype.addChildOfCategory;
    api.Element.prototype.addChildOfCategory = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || '';
        var arg3 = arguments[2] || true;
        return _addChildOfCategory.call(this, arg1, arg2, arg3);
    };

    var _getAttributeNames = Module.Element.prototype.getAttributeNames;
    api.Element.prototype.getAttributeNames = function() {
        var vec = _getAttributeNames.call(this);
        return vecToArray(vec);
    };

    var _copyContentFrom = Module.Element.prototype.copyContentFrom;
    api.Element.prototype.copyContentFrom = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] === undefined ? new Module.CopyOptions() : arguments[1];
        return _copyContentFrom.call(this, arg1, arg2);
    };

    var _getChildren = Module.Element.prototype.getChildren;
    api.Element.prototype.getChildren = function() {
        var vec = _getChildren.call(this);
        return vecToArray(vec);
    };

    var _getUpstreamEdge = Module.Element.prototype.getUpstreamEdge;
    api.Element.prototype.getUpstreamEdge = function() {
        var arg1 = arguments[0] || null;
        var arg2 = arguments[1] || 0;
        return _getUpstreamEdge.call(this, arg1, arg2);
    };

    var _getUpstreamElement = Module.Element.prototype.getUpstreamElement;
    api.Element.prototype.getUpstreamElement = function() {
        var arg1 = arguments[0] || null;
        var arg2 = arguments[1] || 0;
        return _getUpstreamElement.call(this, arg1, arg2);
    };

    var _validate = Module.Element.prototype.validate;
    api.Element.prototype.validate = function() {
        var arg1 = arguments[0] || '';
        return _validate.call(this, arg1);
    };

    var _createStringResolver = Module.Element.prototype.createStringResolver;
    api.Element.prototype.createStringResolver = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[0] || null;
        var arg3 = arguments[0] || '';
        var arg4 = arguments[0] || '';
        return _createStringResolver.call(this, arg1, arg2, arg3, arg4);
    };

    /** Setup the TypedElement class */
    api.TypedElement = wrapperFactory(Module.TypedElement);

    /** Setup the ValueElement class */
    api.ValueElement = wrapperFactory(Module.ValueElement);

    var _getResolvedValueString = Module.ValueElement.prototype.getResolvedValueString;
    api.ValueElement.prototype.getResolvedValueString = function() {
        var arg1 = arguments[0] || null;
        return _getResolvedValueString.call(this, arg1);
    };

    /** Setup the Token class */
    api.Token = wrapperFactory(Module.Token);

    /** Setup the StringResolver class */
    api.StringResolver = wrapperFactory(Module.StringResolver);
});
