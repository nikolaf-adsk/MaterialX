#include "helpers.h"
#include <MaterialXCore/Property.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_PROPERTYSET_TYPE_INSTANCE(NAME, T) \
.function("_setPropertyValue" #NAME, &PropertySet::setPropertyValue<T>)

extern "C"
{
    EMSCRIPTEN_BINDINGS(property)
    {

        class_<Property, base<ValueElement>>("Property")
            .smart_ptr_constructor("Property", &std::make_shared<Property, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Property>>("Property")
            .class_property("CATEGORY", &Property::CATEGORY);

        class_<PropertyAssign, base<ValueElement>>("PropertyAssign")
            .smart_ptr_constructor("PropertyAssign", &std::make_shared<PropertyAssign, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const PropertyAssign>>("PropertyAssign")
            .function("setProperty", &PropertyAssign::setProperty)
            .function("hasProperty", &PropertyAssign::hasProperty)
            .function("getProperty", &PropertyAssign::getProperty)
            .function("setGeom", &PropertyAssign::setGeom)
            .function("hasGeom", &PropertyAssign::hasGeom)
            .function("getGeom", &PropertyAssign::getGeom)
            .function("setCollectionString", &PropertyAssign::setCollectionString)
            .function("hasCollectionString", &PropertyAssign::hasCollectionString)
            .function("getCollectionString", &PropertyAssign::getCollectionString)
            .function("setCollection", &PropertyAssign::setCollection)
            .function("getCollection", &PropertyAssign::getCollection)
            .class_property("CATEGORY", &PropertyAssign::CATEGORY);

        class_<PropertySet, base<Element>>("PropertySet")
            .smart_ptr_constructor("PropertySet", &std::make_shared<PropertySet, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const PropertySet>>("PropertySet")
            .function("addProperty", &PropertySet::addProperty)
            .function("getProperties", &PropertySet::getProperties)
            .function("removeProperty", &PropertySet::removeProperty)
            .function("_getPropertyValue", &PropertySet::getPropertyValue)
            BIND_PROPERTYSET_TYPE_INSTANCE(integer, int)
            BIND_PROPERTYSET_TYPE_INSTANCE(boolean, bool)
            BIND_PROPERTYSET_TYPE_INSTANCE(float, float)
            BIND_PROPERTYSET_TYPE_INSTANCE(color2, Color2)
            BIND_PROPERTYSET_TYPE_INSTANCE(color3, Color3)
            BIND_PROPERTYSET_TYPE_INSTANCE(color4, Color4)
            BIND_PROPERTYSET_TYPE_INSTANCE(vector2, Vector2)
            BIND_PROPERTYSET_TYPE_INSTANCE(vector3, Vector3)
            BIND_PROPERTYSET_TYPE_INSTANCE(vector4, Vector4)
            BIND_PROPERTYSET_TYPE_INSTANCE(matrix33, Matrix33)
            BIND_PROPERTYSET_TYPE_INSTANCE(matrix44, Matrix44)
            BIND_PROPERTYSET_TYPE_INSTANCE(string, std::string)
            BIND_PROPERTYSET_TYPE_INSTANCE(integerarray, IntVec)
            BIND_PROPERTYSET_TYPE_INSTANCE(booleanarray, BoolVec)
            BIND_PROPERTYSET_TYPE_INSTANCE(floatarray, FloatVec)
            BIND_PROPERTYSET_TYPE_INSTANCE(stringarray, StringVec)
            .class_property("CATEGORY", &Property::CATEGORY);

        class_<PropertySetAssign, base<GeomElement>>("PropertySetAssign")
            .smart_ptr_constructor("PropertySetAssign", &std::make_shared<PropertySetAssign, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const PropertySetAssign>>("PropertySetAssign")
            .function("setPropertySetString", &PropertySetAssign::setPropertySetString)
            .function("hasPropertySetString", &PropertySetAssign::hasPropertySetString)
            .function("getPropertySetString", &PropertySetAssign::getPropertySetString)
            .function("setPropertySet", &PropertySetAssign::setPropertySet)
            .function("getPropertySet", &PropertySetAssign::getPropertySet)
            .class_property("CATEGORY", &PropertySetAssign::CATEGORY);


        // register_vector<MaterialAssignPtr>("vector<MaterialAssignPtr>");
        // register_vector<PropertyAssignPtr>("vector<PropertyAssignPtr>");

        
    }
}