// jsVariant
addWrapper(function(Module, api) {
    /** Setup the Variant class */
    api.Variant = wrapperFactory(Module.Variant);

    /** Setup the VariantSet class */
    api.VariantSet = wrapperFactory(Module.VariantSet);

    var _addVariant = Module.VariantSet.prototype.addVariant;
    api.VariantSet.prototype.addVariant = function() {
        var arg1 = arguments[0] || '';
        return _addVariant.call(this, arg1);
    };

    var _getVariants = Module.VariantSet.prototype.getVariants;
    api.VariantSet.prototype.getVariants = function() {
        var vec = _getVariants.call(this);
        return vecToArray(vec);
    };

    /** Setup the VariantAssign class */
    api.VariantAssign = wrapperFactory(Module.VariantAssign);
});
