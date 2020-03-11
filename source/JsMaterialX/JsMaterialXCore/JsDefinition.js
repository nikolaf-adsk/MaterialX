// JsDefinition
addWrapper(function(Module, api) {
    /** Setup the NodeDef class */
    api.NodeDef = wrapperFactory(Module.NodeDef);
    var _getImplementation = Module.NodeDef.prototype.getImplementation;
    api.NodeDef.prototype.getImplementation = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[1] || '';
        return _getImplementation.call(this, arg1, arg2);
    };

    /** Setup the Implementation class */
    api.Implementation = wrapperFactory(Module.Implementation);

    /** Setup the TypeDef class */
    api.TypeDef = wrapperFactory(Module.TypeDef);

    var _getMembers = Module.TypeDef.prototype.getMembers;
    api.TypeDef.prototype.getMembers = function() {
        var vec = _getMembers.call(this);
        return vecToArray(vec);
    };

    var _addMember = Module.TypeDef.prototype.addMember;
    api.TypeDef.prototype.addMember = function() {
        var arg1 = arguments[0] || '';
        return _addMember.call(this, arg1);
    };

    /** Setup the Member class */
    api.Member = wrapperFactory(Module.Member);

    /** Setup the Unit class */
    api.Unit = wrapperFactory(Module.Unit);

    /** Setup the UnitDef class */
    api.UnitDef = wrapperFactory(Module.UnitDef);

    var _getUnits = Module.UnitDef.prototype.getUnits;
    api.UnitDef.prototype.getUnits = function() {
        var vec = _getUnits.call(this);
        return vecToArray(vec);
    };

    /** Setup the UnitTypeDef class */
    api.UnitTypeDef = wrapperFactory(Module.UnitTypeDef);

    var _getUnitDefs = Module.UnitTypeDef.prototype.getUnitDefs;
    api.UnitTypeDef.prototype.getUnitDefs = function() {
        var vec = _getUnitDefs.call(this);
        return vecToArray(vec);
    };
});
