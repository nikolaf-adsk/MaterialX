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
vector<myClass> arrayToVec(myClass *arr, int size)
{
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
            .smart_ptr_constructor("Element", &std::make_shared<Element, ElementPtr, const string &, const string &>)
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
            .function("addChildOfCategory", &Element::addChildOfCategory)
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
            .function("getVersionIntegers", optional_override([](Element &self) {
                          // std::pair throws a unbound type error when envoving the function in javascript
                          // As a result, the std:pair will be converted into an array.
                          std::pair<int, int> versionInts = self.Element::getVersionIntegers();
                          return arrayToVec((int *)&versionInts, 2);
                      }))
            .function("getDefaultVersion", &Element::getDefaultVersion)
            .function("getDocString", &Element::getDocString)

            .function("getChild", &Element::getChild)
            .function("getChildren", &Element::getChildren) /** TODO: unbound types: NSt3__26vectorINS_10shared_ptrIN9MaterialX7ElementEEENS_9allocatorIS4_EEEE */
            .function("setChildIndex", &Element::setChildIndex)
            .function("getChildIndex", &Element::getChildIndex)
            .function("removeChild", &Element::removeChild)

            .function("setAttribute", &Element::setAttribute)
            .function("hasAttribute", &Element::hasAttribute)
            .function("getAttribute", &Element::getAttribute)
            .function("getAttributeNames", &Element::getAttributeNames)
            .function("removeAttribute", &Element::removeAttribute)
            .function("getSelf", optional_override([](Element &self) {
                          return self.Element::getSelf();
                      }))
            .function("getParent", optional_override([](Element &self) {
                          return self.Element::getParent();
                      }))
            .function("getRoot", optional_override([](Element &self) {
                          return self.Element::getRoot();
                      }))
            .function("getDocument", optional_override([](Element &self) { /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX8DocumentEEE */
                                                                           return self.Element::getDocument();
                      }))
            .function("traverseTree", &Element::traverseTree) /** TODO: unbound types: N9MaterialX12TreeIteratorE*/

            .function("traverseGraph", &Element::traverseGraph)     /** TODO: unbound types: N9MaterialX13GraphIteratorE, NSt3__210shared_ptrIKN9MaterialX8MaterialEEE*/
            .function("getUpstreamEdge", &Element::getUpstreamEdge) /** TODO: unbound types: N9MaterialX4EdgeE, NSt3__210shared_ptrIKN9MaterialX8MaterialEEE*/
            .function("getUpstreamEdgeCount", &Element::getUpstreamEdgeCount)
            .function("getUpstreamElement", &Element::getUpstreamElement) /** TODO: unbound types: NSt3__210shared_ptrIKN9MaterialX8MaterialEEE*/

            .function("traverseInheritance", &Element::traverseInheritance) /** TODO: unbound types: N9MaterialX19InheritanceIteratorE */
            .function("setSourceUri", &Element::setSourceUri)
            .function("hasSourceUri", &Element::hasSourceUri)
            .function("getSourceUri", &Element::getSourceUri)
            .function("getActiveSourceUri", &Element::getActiveSourceUri)
            .function("validate", optional_override([](Element &self, std::string message) {
                          bool res = self.Element::validate(&message);
                          return res;
                      }))
            .function("copyContentFrom", optional_override([](Element &self, ConstElementPtr source, CopyOptions copyOptions) {
                          const ConstElementPtr &source1 = source;
                          //   const CopyOptions copyOptions1 = const_cast<CopyOptions>(copyOptions);
                          const CopyOptions *str1 = &copyOptions;
                          return self.Element::copyContentFrom(source1, str1);
                      }))
            .function("clearContent", &Element::clearContent)
            .function("createValidChildName", &Element::createValidChildName)
            .function("createStringResolver", &Element::createStringResolver) /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX14StringResolverEEE, NSt3__210shared_ptrIKN9MaterialX8MaterialEEE */
            .function("asString", &Element::asString)
            .function("__str__", &Element::asString);
    }
}