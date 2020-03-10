// jsLook
addWrapper(function(Module, api) {
    /** Setup the Look class */
    api.Look = wrapperFactory(Module.Look);

    var _addMaterialAssign = Module.Look.prototype.addMaterialAssign;
    api.Look.prototype.addMaterialAssign = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[1] || '';
        return _addMaterialAssign.call(this, arg1, arg2);
    };

    var _addPropertyAssign = Module.Look.prototype.addPropertyAssign;
    api.Look.prototype.addPropertyAssign = function() {
        var arg1 = arguments[0] || '';
        return _addPropertyAssign.call(this, arg1);
    };

    var _addPropertySetAssign = Module.Look.prototype.addPropertySetAssign;
    api.Look.prototype.addPropertySetAssign = function() {
        var arg1 = arguments[0] || '';
        return _addPropertySetAssign.call(this, arg1);
    };

    var _addVariantAssign = Module.Look.prototype.addVariantAssign;
    api.Look.prototype.addVariantAssign = function() {
        var arg1 = arguments[0] || '';
        return _addVariantAssign.call(this, arg1);
    };

    var _addVisibility = Module.Look.prototype.addVisibility;
    api.Look.prototype.addVisibility = function() {
        var arg1 = arguments[0] || '';
        return _addVisibility.call(this, arg1);
    };

    var _getPropertyAssigns = Module.Look.prototype.getPropertyAssigns;
    api.Look.prototype.getPropertyAssigns = function() {
        var vec = _getPropertyAssigns.call(this);
        return vecToArray(vec);
    };

    var _getActivePropertyAssigns = Module.Look.prototype.getActivePropertyAssigns;
    api.Look.prototype.getActivePropertyAssigns = function() {
        var vec = _getActivePropertyAssigns.call(this);
        return vecToArray(vec);
    };

    var _getPropertySetAssigns = Module.Look.prototype.getPropertySetAssigns;
    api.Look.prototype.getPropertySetAssigns = function() {
        var vec = _getPropertySetAssigns.call(this);
        return vecToArray(vec);
    };

    var _getActivePropertySetAssigns = Module.Look.prototype.getActivePropertySetAssigns;
    api.Look.prototype.getActivePropertySetAssigns = function() {
        var vec = _getActivePropertySetAssigns.call(this);
        return vecToArray(vec);
    };

    var _getVisibilities = Module.Look.prototype.getVisibilities;
    api.Look.prototype.getVisibilities = function() {
        var vec = _getVisibilities.call(this);
        return vecToArray(vec);
    };

    var _getActiveVisibilities = Module.Look.prototype.getActiveVisibilities;
    api.Look.prototype.getActiveVisibilities = function() {
        var vec = _getActiveVisibilities.call(this);
        return vecToArray(vec);
    };

    var _getMaterialAssigns = Module.Look.prototype.getMaterialAssigns;
    api.Look.prototype.getMaterialAssigns = function() {
        var vec = _getMaterialAssigns.call(this);
        return vecToArray(vec);
    };

    var _getActiveMaterialAssigns = Module.Look.prototype.getActiveMaterialAssigns;
    api.Look.prototype.getActiveMaterialAssigns = function() {
        var vec = _getActiveMaterialAssigns.call(this);
        return vecToArray(vec);
    };

    var _getVariantAssigns = Module.Look.prototype.getVariantAssigns;
    api.Look.prototype.getVariantAssigns = function() {
        var vec = _getVariantAssigns.call(this);
        return vecToArray(vec);
    };

    var _getActiveVariantAssigns = Module.Look.prototype.getActiveVariantAssigns;
    api.Look.prototype.getActiveVariantAssigns = function() {
        var vec = _getActiveVariantAssigns.call(this);
        return vecToArray(vec);
    };

    /** Setup the LookGroup class */
    api.LookGroup = wrapperFactory(Module.LookGroup);

    /** Setup the MaterialAssign class */
    api.MaterialAssign = wrapperFactory(Module.MaterialAssign);

    /** Setup the Visibility class */
    api.Visibility = wrapperFactory(Module.Visibility);
});
