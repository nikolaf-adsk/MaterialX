// jsElement
addWrapper(function(Module, api) {
    /** Setup the CopyOptions class */
    api.CopyOptions = Module.CopyOptions;

    /** Setup the Element class */
    api.Element = wrapperFactory(Module.Element, {
        getNamePath: [null],
        addChildOfCategory: [REQUIRED, '', true],
        copyContentFrom: [REQUIRED, api.CopyOptions],
        getUpstreamEdge: [null, 0],
        getUpstreamElement: [null, 0],
        validate: [''],
        createStringResolver: ['', null, '', '']
    });

    /** Setup the TypedElement class */
    api.TypedElement = wrapperFactory(Module.TypedElement);

    /** Setup the ValueElement class */
    api.ValueElement = wrapperFactory(Module.ValueElement, {
        getResolvedValueString: [null]
    });

    /** Setup the Token class */
    api.Token = wrapperFactory(Module.Token);

    /** Setup the StringResolver class */
    api.StringResolver = wrapperFactory(Module.StringResolver);
});
