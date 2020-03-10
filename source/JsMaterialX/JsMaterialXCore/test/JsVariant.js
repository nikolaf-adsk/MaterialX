addValidator(function() {
    var validator = new Validator('JsVariant.js');

    validator.classValidatorCb('Variant', null, function() {
        MaterialX.Variant.CATEGORY;
    });

    validator.classValidatorCb(
        'VariantSet',
        function() {
            var doc = MaterialX.createDocument();
            var variantSet = doc.addVariantSet('variantSet');
            variantSet.addVariant('Variant');
            variantSet.getVariant('Variant');
            variantSet.getVariants();
            variantSet.removeVariant('Variant');
            variantSet.getVariants();
        },
        function() {
            MaterialX.VariantSet.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'VariantAssign',
        function() {
            var doc = MaterialX.createDocument();
            var look = doc.addLook('Look1');
            var variantAssign = look.addVariantAssign();
            variantAssign.setVariantSetString('test');
            variantAssign.hasVariantSetString();
            variantAssign.getVariantSetString();
            variantAssign.setVariantString('test');
            variantAssign.hasVariantString();
            variantAssign.getVariantString();
        },
        function() {
            MaterialX.VariantAssign.CATEGORY;
        }
    );

    validator.validate();
});
