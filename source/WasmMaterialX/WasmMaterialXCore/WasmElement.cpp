#include <MaterialXCore/Element.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;


extern "C"
{
    EMSCRIPTEN_BINDINGS(element)
    {
        class_<CopyOptions>("CopyOptions")
            .constructor<>()
            .property("skipConflictingElements", &CopyOptions::skipConflictingElements);


        class_<Element>("Element")
            .constructor<ElementPtr, const string&, const string&>()
            .smart_ptr<std::shared_ptr<Element>>("Element") // ElementPtr
            .smart_ptr<std::shared_ptr<const Element>>("Element") // ConstElementPtr
            .function("setCategory", &Element::setCategory)
            .function("getCategory", &Element::getCategory)
            // TODO: How the pointer is constructed needs to be fixed for the setName function
            // TODO: Example:
            // var element = new MaterialX.Element(null, 'test', 'test1');
            // var element2 = new MaterialX.Element(element, "Hello", "World");
            // Throws a "Passing raw pointer to smart pointer is illegal"
            .function("setName", &Element::setName) 
            .function("getName", &Element::getName)
            // TODO: Same problem as in setName. Passing raw pointer to smart pointer is illegal  
            .function("getNamePath", &Element::getNamePath) // might need to do something with the ConstElementPtr relativeTo parameter
            // TODO: setAttribute (called by setFilePrefix) depends on Document class.
            .function("setFilePrefix", &Element::setFilePrefix)
            ;

    }
}