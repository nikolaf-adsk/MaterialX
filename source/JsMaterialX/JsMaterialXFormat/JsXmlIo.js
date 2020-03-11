// jsGeom
addWrapper(function(Module, api) {
    /** Setup the XmlReadOptions class */
    api.XmlReadOptions = Module.XmlReadOptions;

    /** Setup the XmlWriteOptions class */
    api.XmlWriteOptions = Module.XmlWriteOptions;

    api.readFromXmlString = wrapperFunction(Module.readFromXmlString);
    api.writeToXmlString = wrapperFunction(Module.writeToXmlString);

});
