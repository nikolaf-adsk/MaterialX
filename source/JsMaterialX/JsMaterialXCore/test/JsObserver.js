addValidator(function() {
    var validator = new Validator('JsObserver.js');

    validator.classValidatorCb('Observer', function() {
        var doc = MaterialX.createDocument();
        var observer = new MaterialX.Observer();
        var element = doc.addChildOfCategory('generic');
        var parent = doc.addChildOfCategory('generic');
        observer.onAddElement(parent, element);
        observer.onRemoveElement(parent, element);
        var element2 = doc.addChildOfCategory('generic');
        observer.onSetAttribute(element2, 'attrib', 'value');
        observer.onRemoveAttribute(element2, 'attrib');
        var element3 = doc.addChildOfCategory('generic');
        observer.onCopyContent(element3);
        observer.onClearContent(element3);
        observer.onRead();
        observer.onWrite();
        observer.onBeginUpdate();
        observer.onEndUpdate();
    });

    validator.classValidatorCb('ObservedDocument', function() {
        var doc = MaterialX.createDocument();
        var observedDoc = MaterialX.createObservedDocument();

        observedDoc.copy();

        var observer = new MaterialX.Observer();
        observedDoc.addObserver('Observer1', observer);
        observedDoc.removeObserver('Observer1');
        observedDoc.clearObservers();
        observedDoc.getUpdateScope();
        observedDoc.enableCallbacks();
        observedDoc.disableCallbacks();
    });

    validator.validate();
});
