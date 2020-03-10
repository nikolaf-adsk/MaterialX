#include "helpers.h"
#include <MaterialXCore/Traversal.h>

#include <MaterialXCore/Observer.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(observer)
    {
        class_<Observer>("Observer")
            .smart_ptr_constructor("Observer", &std::make_shared<Observer>)
            .smart_ptr<std::shared_ptr<const Observer>>("Observer")
            .function("onAddElement", &Observer::onAddElement)
            .function("onRemoveElement", &Observer::onRemoveElement)
            .function("onSetAttribute", &Observer::onSetAttribute)
            .function("onRemoveAttribute", &Observer::onRemoveAttribute)
            .function("onCopyContent", &Observer::onCopyContent)
            .function("onClearContent", &Observer::onClearContent)
            .function("onRead", &Observer::onRead)
            .function("onWrite", &Observer::onWrite)
            .function("onBeginUpdate", &Observer::onBeginUpdate)
            .function("onEndUpdate", &Observer::onEndUpdate);

        function("createObservedDocument", &Document::createDocument<ObservedDocument>);

        class_<ObservedDocument, base<Document>>("ObservedDocument")
            .smart_ptr_constructor("ObservedDocument", &std::make_shared<ObservedDocument, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const ObservedDocument>>("ObservedDocument")
            .function("copy", &ObservedDocument::copy)
            .function("addObserver", &ObservedDocument::addObserver)
            .function("removeObserver", &ObservedDocument::removeObserver)
            .function("clearObservers", &ObservedDocument::clearObservers)
            .function("getUpdateScope", &ObservedDocument::getUpdateScope)
            .function("enableCallbacks", &ObservedDocument::enableCallbacks)
            .function("disableCallbacks", &ObservedDocument::disableCallbacks);
    }
}