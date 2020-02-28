#include <MaterialXCore/Element.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

namespace foo
{
std::string getExceptionMessage(int exceptionPtr)
{
    return std::string(reinterpret_cast<std::exception *>(exceptionPtr)->what());
}
} // namespace foo

template <class myClass> 
vector <myClass> arrayToVec(myClass* arr, int size) {
    std::vector<myClass> dest(arr, arr + size);
    return dest;
}

extern "C"
{
    EMSCRIPTEN_BINDINGS(element)
    {
        emscripten::function("getExceptionMessage", &foo::getExceptionMessage);
        class_<CopyOptions>("CopyOptions")
            .constructor<>()
            .property("skipConflictingElements", &CopyOptions::skipConflictingElements);

        class_<Element>("Element")
            .smart_ptr_constructor("Element", &std::make_shared<Element, ElementPtr, const string&, const string&>)
            // .constructor<ElementPtr, const string &, const string &>()
            // .smart_ptr<std::shared_ptr<Element>>("Element")       // ElementPtr
            .smart_ptr<std::shared_ptr<const Element>>("Element") // ConstElementPtr
            .function("setCategory", &Element::setCategory)
            .function("getCategory", &Element::getCategory)
            .function("getName", &Element::getName)

            /** TODO: How the pointer is constructed needs to be fixed for the setName function
            *** TODO: Example:
            *** var element = new MaterialX.Element(null, 'test', 'test1');
            *** var element2 = new MaterialX.Element(element, "Hello", "World");
            *** Throws a "Passing raw pointer to smart pointer is illegal"
            **/
            .function("setName", &Element::setName)
            .function("getNamePath", &Element::getNamePath) // might need to do something with the ConstElementPtr relativeTo parameter
            .function("setInheritsFrom", &Element::setInheritsFrom)
            .function("hasInheritedBase", &Element::hasInheritedBase)
            /*************************************************************************************/

            /** TODO: setAttribute (called by setFilePrefix) depends on Document class. **/
            .function("setFilePrefix", &Element::setFilePrefix)
            .function("setColorSpace", &Element::setColorSpace)
            .function("setGeomPrefix", &Element::setGeomPrefix)
            .function("setTarget", &Element::setTarget)
            .function("setInheritString", &Element::setInheritString)
            .function("setNamespace", &Element::setNamespace)
            .function("setVersionString", &Element::setVersionString)
            .function("setDefaultVersion", &Element::setDefaultVersion)
            .function("setDocString", &Element::setDocString)
            /******************************************************************************/

            /** TODO: This API needs a reference to the parent. This will not work due to the pointer issue. **/
            .function("getActiveFilePrefix", &Element::getActiveFilePrefix)
            .function("getActiveGeomPrefix", &Element::getActiveGeomPrefix)
            .function("getActiveColorSpace", &Element::getActiveColorSpace)
            .function("getInheritsFrom", &Element::getInheritsFrom)
            .function("hasInheritanceCycle", &Element::hasInheritanceCycle)
            .function("getQualifiedName", &Element::getQualifiedName)
            /**************************************************************************************************/

            .function("hasFilePrefix", &Element::hasFilePrefix)
            .function("hasGeomPrefix", &Element::hasGeomPrefix)
            .function("hasColorSpace", &Element::hasColorSpace)
            .function("hasTarget", &Element::hasTarget)
            .function("hasInheritString", &Element::hasInheritString)
            .function("hasNamespace", &Element::hasNamespace)
            .function("hasVersionString", &Element::hasVersionString)

            .function("getFilePrefix", &Element::getFilePrefix)
            .function("getGeomPrefix", &Element::getGeomPrefix)
            .function("getColorSpace", &Element::getColorSpace)            
            .function("getTarget", &Element::getTarget)
            .function("getInheritString", &Element::getInheritString)
            .function("getNamespace", &Element::getNamespace)
            .function("getVersionString", &Element::getVersionString)
            .function("getVersionIntegers", optional_override([](Element& self){
                std::pair<int, int> versionInts = self.Element::getVersionIntegers();
                return arrayToVec((int *) &versionInts, 2); 
            }))
            .function("getDefaultVersion", &Element::getDefaultVersion)
            .function("getDocString", &Element::getDocString)

            // .function("addChildOfCategory", &Element::addChildOfCategory,
            //     py::arg("category"), py::arg("name") = mx::EMPTY_STRING, py::arg("registerChild") = true)
            .function("getChild", &Element::getChild)
            .function("getChildren", &Element::getChildren)
            .function("setChildIndex", &Element::setChildIndex)
            .function("getChildIndex", &Element::getChildIndex)
            .function("removeChild", &Element::removeChild)
            .function("setAttribute", &Element::setAttribute)
            .function("hasAttribute", &Element::hasAttribute)
            .function("getAttribute", &Element::getAttribute)
            .function("getAttributeNames", &Element::getAttributeNames)
            // .function("removeAttribute", &Element::removeAttribute)
            
            ;
    }
}