var xmlStr =
    ' <?xml version="1.0"?>' +
    '<materialx version="1.37" colorspace="srgb_texture" fileprefix="resources/Images/">' +
    '<nodegraph name="NG_Greysphere_Calibration">' +
    '<texcoord name="texcoord1" type="vector2" />' +
    '<place2d name="place2d" type="vector2">' +
    '<input name="texcoord" type="vector2" nodename="texcoord1"/>' +
    '<input name="offset" type="vector2" value="-1.66, -0.49"/>' +
    '<input name="scale" type="vector2" value="0.21, 0.21"/>' +
    '<parameter name="pivot" type="vector2" value="0.5, 0.5"/>' +
    '</place2d>' +
    '<image name="image1" type="color3">' +
    '<input name="texcoord" type="vector2" nodename="place2d" />' +
    '<parameter name="file" type="filename" value="greysphere_calibration.png" />' +
    '<parameter name="uaddressmode" type="string" value="clamp" />' +
    '<parameter name="vaddressmode" type="string" value="clamp" />' +
    '</image>' +
    '<output name="out1" type="color3" nodename="image1" />' +
    '</nodegraph>' +
    '<material name="Greysphere_Calibration">' +
    '<shaderref name="SR_Greysphere_Calibration" node="standard_surface">' +
    '<bindinput name="base" type="float" value="1.0" />' +
    '<bindinput name="base_color" type="color3" nodegraph="NG_Greysphere_Calibration" output="out1" />' +
    '<bindinput name="diffuse_roughness" type="float" value="0"/>' +
    '<bindinput name="specular" type="float" value="1"/>' +
    '<bindinput name="specular_color" type="color3" value="1, 1, 1"/>' +
    '<bindinput name="specular_roughness" type="float" value="0.7"/>' +
    '<bindinput name="specular_IOR" type="float" value="1.5"/>' +
    '</shaderref>' +
    '</material>' +
    '</materialx>';

addValidator(function() {
    var validator = new Validator('JsXmlIo.js');

    validator.classValidatorCb('readFromXmlString', function() {
        var doc = MaterialX.createDocument();
        MaterialX.readFromXmlString(doc, xmlStr);
        doc.getChildren();
        

    });

    validator.validate();
});
