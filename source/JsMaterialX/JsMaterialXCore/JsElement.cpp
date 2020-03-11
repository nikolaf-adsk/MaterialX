#include "../helpers.h"
#include <MaterialXCore/Document.h>
#include <MaterialXCore/Geom.h>
#include <MaterialXCore/Look.h>
#include <MaterialXCore/Material.h>
#include <MaterialXCore/Node.h>
#include <MaterialXCore/Traversal.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_ELEMENT_FUNC_INSTANCE(T)                                  \
    .function("_addChild" #T, &Element::addChild<T>)                   \
    .function("_getChildOfType" #T, &Element::getChildOfType<T>)       \
    .function("_getChildrenOfType" #T, &Element::getChildrenOfType<T>) \
    .function("_removeChildOfType" #T, &Element::removeChildOfType<T>)

extern "C"
{
    EMSCRIPTEN_BINDINGS(element)
    {
        class_<CopyOptions>("CopyOptions")
            .constructor<>()
            .property("skipConflictingElements", &CopyOptions::skipConflictingElements);

        class_<Element>("Element")
            .smart_ptr<std::shared_ptr<Element>>("Element")
            .smart_ptr<std::shared_ptr<const Element>>("Element") // ConstElementPtr
            .function("setCategory", &Element::setCategory)
            .function("getCategory", &Element::getCategory)
            .function("getName", &Element::getName)
            .function("setName", &Element::setName)
            .function("getNamePath", &Element::getNamePath) // might need to do something with the ConstElementPtr relativeTo parameter
            .function("setInheritsFrom", &Element::setInheritsFrom)
            .function("hasInheritedBase", &Element::hasInheritedBase)
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
            .function("getActiveFilePrefix", &Element::getActiveFilePrefix)
            .function("getActiveGeomPrefix", &Element::getActiveGeomPrefix)
            .function("getActiveColorSpace", &Element::getActiveColorSpace)
            .function("getInheritsFrom", &Element::getInheritsFrom)
            .function("hasInheritanceCycle", &Element::hasInheritanceCycle)
            .function("getQualifiedName", &Element::getQualifiedName)
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
            .function("getChildren", &Element::getChildren)
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
            .function("getDocument", optional_override([](Element &self) {
                          return self.Element::getDocument();
                      }))
            .function("traverseTree", &Element::traverseTree)

            .function("traverseGraph", &Element::traverseGraph)
            .function("getUpstreamEdge", &Element::getUpstreamEdge)
            .function("getUpstreamEdgeCount", &Element::getUpstreamEdgeCount)
            .function("getUpstreamElement", &Element::getUpstreamElement)

            .function("traverseInheritance", &Element::traverseInheritance)
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
                          const CopyOptions *str1 = &copyOptions;
                          return self.Element::copyContentFrom(source1, str1);
                      }))
            .function("clearContent", &Element::clearContent)
            .function("createValidChildName", &Element::createValidChildName)
            .function("createStringResolver", &Element::createStringResolver)
            .function("asString", &Element::asString)
            .function("__str__", &Element::asString)
            BIND_ELEMENT_FUNC_INSTANCE(BindParam)
            BIND_ELEMENT_FUNC_INSTANCE(BindInput)
            BIND_ELEMENT_FUNC_INSTANCE(BindToken)
            BIND_ELEMENT_FUNC_INSTANCE(Collection)
            BIND_ELEMENT_FUNC_INSTANCE(Document)
            BIND_ELEMENT_FUNC_INSTANCE(GeomAttr)
            BIND_ELEMENT_FUNC_INSTANCE(GeomInfo)
            BIND_ELEMENT_FUNC_INSTANCE(Implementation)
            BIND_ELEMENT_FUNC_INSTANCE(Look)
            BIND_ELEMENT_FUNC_INSTANCE(Material)
            BIND_ELEMENT_FUNC_INSTANCE(MaterialAssign)
            BIND_ELEMENT_FUNC_INSTANCE(Node)
            BIND_ELEMENT_FUNC_INSTANCE(NodeDef)
            BIND_ELEMENT_FUNC_INSTANCE(NodeGraph)
            BIND_ELEMENT_FUNC_INSTANCE(Parameter)
            BIND_ELEMENT_FUNC_INSTANCE(Property)
            BIND_ELEMENT_FUNC_INSTANCE(PropertySet)
            BIND_ELEMENT_FUNC_INSTANCE(PropertySetAssign)
            BIND_ELEMENT_FUNC_INSTANCE(ShaderRef)
            BIND_ELEMENT_FUNC_INSTANCE(Token)
            BIND_ELEMENT_FUNC_INSTANCE(TypeDef)
            BIND_ELEMENT_FUNC_INSTANCE(Visibility)
            .class_property("NAME_ATTRIBUTE", &Element::NAME_ATTRIBUTE)
            .class_property("FILE_PREFIX_ATTRIBUTE", &Element::FILE_PREFIX_ATTRIBUTE)
            .class_property("GEOM_PREFIX_ATTRIBUTE", &Element::GEOM_PREFIX_ATTRIBUTE)
            .class_property("COLOR_SPACE_ATTRIBUTE", &Element::COLOR_SPACE_ATTRIBUTE)
            .class_property("TARGET_ATTRIBUTE", &Element::TARGET_ATTRIBUTE)
            .class_property("VERSION_ATTRIBUTE", &Element::VERSION_ATTRIBUTE)
            .class_property("DEFAULT_VERSION_ATTRIBUTE", &Element::DEFAULT_VERSION_ATTRIBUTE)
            .class_property("INHERIT_ATTRIBUTE", &Element::INHERIT_ATTRIBUTE)
            .class_property("NAMESPACE_ATTRIBUTE", &Element::NAMESPACE_ATTRIBUTE)
            .class_property("DOC_ATTRIBUTE", &Element::DOC_ATTRIBUTE);

        class_<TypedElement, base<Element>>("TypedElement")
            .smart_ptr<std::shared_ptr<TypedElement>>("TypedElement")
            .smart_ptr<std::shared_ptr<const TypedElement>>("TypedElement")
            .function("setType", &TypedElement::setType)
            .function("hasType", &TypedElement::hasType)
            .function("getType", &TypedElement::getType)
            .function("isMultiOutputType", &TypedElement::isMultiOutputType)
            .function("getTypeDef", &TypedElement::getTypeDef)
            .class_property("TYPE_ATTRIBUTE", &TypedElement::TYPE_ATTRIBUTE);

        class_<ValueElement, base<TypedElement>>("ValueElement")
            .smart_ptr<std::shared_ptr<ValueElement>>("ValueElement")
            .smart_ptr<std::shared_ptr<const ValueElement>>("ValueElement")
            .function("setValueString", &ValueElement::setValueString)
            .function("hasValueString", &ValueElement::hasValueString)
            .function("getValueString", &ValueElement::getValueString)
            .function("getResolvedValueString", &ValueElement::getResolvedValueString)
            .function("setInterfaceName", &ValueElement::setInterfaceName)
            .function("hasInterfaceName", &ValueElement::hasInterfaceName)
            .function("getInterfaceName", &ValueElement::getInterfaceName)
            .function("setImplementationName", &ValueElement::setImplementationName)
            .function("hasImplementationName", &ValueElement::hasImplementationName)
            .function("getImplementationName", &ValueElement::getImplementationName)
            .function("getValue", &ValueElement::getValue)
            .function("getBoundValue", &ValueElement::getBoundValue)
            .function("getDefaultValue", &ValueElement::getDefaultValue)
            .function("setUnit", &ValueElement::setUnit)
            .function("hasUnit", &ValueElement::hasUnit)
            .function("getUnit", &ValueElement::getUnit)
            .function("getActiveUnit", &ValueElement::getActiveUnit)
            .function("setUnitType", &ValueElement::setUnitType)
            .function("hasUnitType", &ValueElement::hasUnitType)
            .function("getUnitType", &ValueElement::getUnitType)
            .class_property("VALUE_ATTRIBUTE", &ValueElement::VALUE_ATTRIBUTE)
            .class_property("INTERFACE_NAME_ATTRIBUTE", &ValueElement::INTERFACE_NAME_ATTRIBUTE)
            .class_property("IMPLEMENTATION_NAME_ATTRIBUTE", &ValueElement::IMPLEMENTATION_NAME_ATTRIBUTE)
            .class_property("IMPLEMENTATION_TYPE_ATTRIBUTE", &ValueElement::IMPLEMENTATION_TYPE_ATTRIBUTE)
            .class_property("ENUM_ATTRIBUTE", &ValueElement::ENUM_ATTRIBUTE)
            .class_property("ENUM_VALUES_ATTRIBUTE", &ValueElement::ENUM_VALUES_ATTRIBUTE)
            .class_property("UNIT_ATTRIBUTE", &ValueElement::UNIT_ATTRIBUTE)
            .class_property("UI_NAME_ATTRIBUTE", &ValueElement::UI_NAME_ATTRIBUTE)
            .class_property("UI_FOLDER_ATTRIBUTE", &ValueElement::UI_FOLDER_ATTRIBUTE)
            .class_property("UI_MIN_ATTRIBUTE", &ValueElement::UI_MIN_ATTRIBUTE)
            .class_property("UI_MAX_ATTRIBUTE", &ValueElement::UI_MAX_ATTRIBUTE)
            .class_property("UI_SOFT_MIN_ATTRIBUTE", &ValueElement::UI_SOFT_MIN_ATTRIBUTE)
            .class_property("UI_SOFT_MAX_ATTRIBUTE", &ValueElement::UI_SOFT_MAX_ATTRIBUTE)
            .class_property("UI_STEP_ATTRIBUTE", &ValueElement::UI_STEP_ATTRIBUTE)
            .class_property("UI_ADVANCED_ATTRIBUTE", &ValueElement::UI_ADVANCED_ATTRIBUTE);

        class_<Token, base<ValueElement>>("Token")
            .smart_ptr_constructor("Token", &std::make_shared<Token, ElementPtr, const string &>)
            .class_property("CATEGORY", &Token::CATEGORY);

        class_<StringResolver>("StringResolver")
            .smart_ptr<std::shared_ptr<StringResolver>>("StringResolver")
            .class_function("create", &StringResolver::create) // Static function for creating a StringResolver instance
            .function("setFilePrefix", &StringResolver::setFilePrefix)
            .function("getFilePrefix", &StringResolver::getFilePrefix)
            .function("setGeomPrefix", &StringResolver::setGeomPrefix)
            .function("getGeomPrefix", &StringResolver::getGeomPrefix)
            .function("setUdimString", &StringResolver::setUdimString)
            .function("setUvTileString", &StringResolver::setUvTileString)
            .function("setFilenameSubstitution", &StringResolver::setFilenameSubstitution)
            .function("getFilenameSubstitutions", optional_override([](StringResolver &self) {
                          std::unordered_map<string, string> res = self.StringResolver::getFilenameSubstitutions();
                          val obj = val::object();
                          for (const auto &[key, value] : res)
                          {
                              obj.set(key, value);
                          }

                          return obj;
                      }))
            .function("setGeomNameSubstitution", &StringResolver::setGeomNameSubstitution)
            .function("getGeomNameSubstitutions", optional_override([](StringResolver &self) {
                          std::unordered_map<string, string> res = self.StringResolver::getGeomNameSubstitutions();
                          val obj = val::object();
                          for (const auto &[key, value] : res)
                          {
                              obj.set(key, value);
                          }

                          return obj;
                      }))
            .function("resolve", &StringResolver::resolve);

        class_<ElementPredicate>("ElementPredicate");
    }
}