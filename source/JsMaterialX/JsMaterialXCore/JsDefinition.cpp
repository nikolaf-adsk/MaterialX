
#include "helpers.h"
#include <MaterialXCore/Definition.h>

// #include <MaterialXCore/Material.h>
#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(definition)
    {
        class_<NodeDef, base<InterfaceElement>>("NodeDef")
            .smart_ptr_constructor("NodeDef", &std::make_shared<NodeDef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const NodeDef>>("NodeDef")
            .function("setNodeString", &NodeDef::setNodeString)
            .function("hasNodeString", &NodeDef::hasNodeString)
            .function("getNodeString", &NodeDef::getNodeString)
            .function("setNodeGroup", &NodeDef::setNodeGroup)
            .function("hasNodeGroup", &NodeDef::hasNodeGroup)
            .function("getNodeGroup", &NodeDef::getNodeGroup)
            .function("getImplementation", &NodeDef::getImplementation)
            .function("getInstantiatingShaderRefs", &NodeDef::getInstantiatingShaderRefs)
            .function("isVersionCompatible", &NodeDef::isVersionCompatible)
            .class_property("CATEGORY", &NodeDef::CATEGORY)
            .class_property("NODE_ATTRIBUTE", &NodeDef::NODE_ATTRIBUTE)
            .class_property("TEXTURE_NODE_GROUP", &NodeDef::TEXTURE_NODE_GROUP)
            .class_property("PROCEDURAL_NODE_GROUP", &NodeDef::PROCEDURAL_NODE_GROUP)
            .class_property("GEOMETRIC_NODE_GROUP", &NodeDef::GEOMETRIC_NODE_GROUP)
            .class_property("ADJUSTMENT_NODE_GROUP", &NodeDef::ADJUSTMENT_NODE_GROUP)
            .class_property("CONDITIONAL_NODE_GROUP", &NodeDef::CONDITIONAL_NODE_GROUP)
            .class_property("ORGANIZATION_NODE_GROUP", &NodeDef::ORGANIZATION_NODE_GROUP);

        class_<Implementation, base<InterfaceElement>>("Implementation")
            .smart_ptr_constructor("Implementation", &std::make_shared<Implementation, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Implementation>>("Implementation")
            .function("setFile", &Implementation::setFile)
            .function("hasFile", &Implementation::hasFile)
            .function("getFile", &Implementation::getFile)
            .function("setFunction", &Implementation::setFunction)
            .function("hasFunction", &Implementation::hasFunction)
            .function("getFunction", &Implementation::getFunction)
            .function("setLanguage", &Implementation::setLanguage)
            .function("hasLanguage", &Implementation::hasLanguage)
            .function("getLanguage", &Implementation::getLanguage)
            .function("setNodeDef", &Implementation::setNodeDef)
            .function("getNodeDef", &Implementation::getNodeDef)
            .class_property("CATEGORY", &Implementation::CATEGORY)
            .class_property("FILE_ATTRIBUTE", &Implementation::FILE_ATTRIBUTE)
            .class_property("FUNCTION_ATTRIBUTE", &Implementation::FUNCTION_ATTRIBUTE)
            .class_property("LANGUAGE_ATTRIBUTE", &Implementation::LANGUAGE_ATTRIBUTE);

        class_<TypeDef, base<Element>>("TypeDef")
            .smart_ptr_constructor("TypeDef", &std::make_shared<TypeDef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const TypeDef>>("TypeDef")
            .function("setSemantic", &TypeDef::setSemantic)
            .function("hasSemantic", &TypeDef::hasSemantic)
            .function("getSemantic", &TypeDef::getSemantic)
            .function("setContext", &TypeDef::setContext)
            .function("hasContext", &TypeDef::hasContext)
            .function("getContext", &TypeDef::getContext)
            .function("addMember", &TypeDef::addMember)
            .function("getMember", &TypeDef::getMember)
            .function("getMembers", &TypeDef::getMembers)
            .function("removeMember", &TypeDef::removeMember)
            .class_property("CATEGORY", &TypeDef::CATEGORY)
            .class_property("SEMANTIC_ATTRIBUTE", &TypeDef::SEMANTIC_ATTRIBUTE)
            .class_property("CONTEXT_ATTRIBUTE", &TypeDef::CONTEXT_ATTRIBUTE);

        class_<Member, base<TypedElement>>("Member")
            .smart_ptr_constructor("Member", &std::make_shared<Member, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Member>>("Member")
            .class_property("CATEGORY", &TypeDef::CATEGORY);

        class_<Unit, base<Element>>("Unit")
            .smart_ptr_constructor("Unit", &std::make_shared<Unit, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Unit>>("Unit")
            .class_property("CATEGORY", &Unit::CATEGORY);

        class_<UnitDef, base<Element>>("UnitDef")
            .smart_ptr_constructor("UnitDef", &std::make_shared<UnitDef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const UnitDef>>("UnitDef")
            .function("setUnitType", &UnitDef::setUnitType)
            .function("hasUnitType", &UnitDef::hasUnitType)
            .function("getUnitType", &UnitDef::getUnitType)
            .function("addUnit", &UnitDef::addUnit)
            .function("getUnit", &UnitDef::getUnit)
            .function("getUnits", &UnitDef::getUnits)
            .class_property("CATEGORY", &UnitDef::CATEGORY)
            .class_property("UNITTYPE_ATTRIBUTE", &UnitDef::UNITTYPE_ATTRIBUTE);

        class_<UnitTypeDef, base<Element>>("UnitTypeDef")
            .smart_ptr_constructor("UnitTypeDef", &std::make_shared<UnitTypeDef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const UnitTypeDef>>("UnitTypeDef")
            .function("getUnitDefs", &UnitTypeDef::getUnitDefs)
            .class_property("CATEGORY", &UnitTypeDef::CATEGORY);
    }
}