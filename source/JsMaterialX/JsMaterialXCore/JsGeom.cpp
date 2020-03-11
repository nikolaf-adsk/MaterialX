#include "../helpers.h"
#include <MaterialXCore/Geom.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

#define BIND_GEOMINFO_FUNC_INSTANCE(NAME, T) \
.function("_setGeomAttrValue" #NAME, &GeomInfo::setGeomAttrValue<T>)

extern "C"
{
    EMSCRIPTEN_BINDINGS(geom)
    {
        class_<GeomElement, base<Element>>("GeomElement")
            .smart_ptr<std::shared_ptr<GeomElement>>("GeomElement")
            // .smart_ptr<("GeomElement", &std::make_shared<GeomElement, ElementPtr, const string &, const string &>)
            .smart_ptr<std::shared_ptr<const GeomElement>>("GeomElement")
            .function("setGeom", &GeomElement::setGeom)
            .function("hasGeom", &GeomElement::hasGeom)
            .function("getGeom", &GeomElement::getGeom)
            .function("setCollectionString", &GeomElement::setCollectionString)
            .function("hasCollectionString", &GeomElement::hasCollectionString)
            .function("getCollectionString", &GeomElement::getCollectionString)
            .function("setCollection", &GeomElement::setCollection)
            .function("getCollection", &GeomElement::getCollection);

        class_<GeomInfo, base<GeomElement>>("GeomInfo")
            .smart_ptr_constructor("GeomInfo", &std::make_shared<GeomInfo, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const GeomInfo>>("GeomInfo")
            .function("_addGeomAttr", &GeomInfo::addGeomAttr)
            .function("getGeomAttr", &GeomInfo::getGeomAttr)
            .function("getGeomAttrs", &GeomInfo::getGeomAttrs)
            .function("removeGeomAttr", &GeomInfo::removeGeomAttr)
            .function("addToken", &GeomInfo::addToken)
                //  arg("name") = DEFAULT_TYPE_STRING)
            .function("getToken", &GeomInfo::getToken)
            .function("getTokens", &GeomInfo::getTokens)
            .function("removeToken", &GeomInfo::removeToken)
            .function("setTokenValue", &GeomInfo::setTokenValue)
            BIND_GEOMINFO_FUNC_INSTANCE(integer, int)
            BIND_GEOMINFO_FUNC_INSTANCE(boolean, bool)
            BIND_GEOMINFO_FUNC_INSTANCE(float, float)
            BIND_GEOMINFO_FUNC_INSTANCE(color2, Color2)
            BIND_GEOMINFO_FUNC_INSTANCE(color3, Color3)
            BIND_GEOMINFO_FUNC_INSTANCE(color4, Color4)
            BIND_GEOMINFO_FUNC_INSTANCE(vector2, Vector2)
            BIND_GEOMINFO_FUNC_INSTANCE(vector3, Vector3)
            BIND_GEOMINFO_FUNC_INSTANCE(vector4, Vector4)
            BIND_GEOMINFO_FUNC_INSTANCE(matrix33, Matrix33)
            BIND_GEOMINFO_FUNC_INSTANCE(matrix44, Matrix44)
            BIND_GEOMINFO_FUNC_INSTANCE(string, std::string)
            BIND_GEOMINFO_FUNC_INSTANCE(integerarray, IntVec)
            BIND_GEOMINFO_FUNC_INSTANCE(booleanarray, BoolVec)
            BIND_GEOMINFO_FUNC_INSTANCE(floatarray, FloatVec)
            BIND_GEOMINFO_FUNC_INSTANCE(stringarray, StringVec)
            .class_property("CATEGORY", &GeomInfo::CATEGORY);

        class_<GeomAttr, base<ValueElement>>("GeomAttr")
            .smart_ptr_constructor("GeomAttr", &std::make_shared<GeomAttr, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const GeomAttr>>("GeomAttr")
            .class_property("CATEGORY", &GeomAttr::CATEGORY);

        class_<GeomPropDef, base<Element>>("GeomPropDef")
            .smart_ptr_constructor("GeomPropDef", &std::make_shared<GeomPropDef, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const GeomPropDef>>("GeomPropDef")
            .function("setGeomProp", &GeomPropDef::setGeomProp)
            .function("hasGeomProp", &GeomPropDef::hasGeomProp)
            .function("getGeomProp", &GeomPropDef::getGeomProp)
            .function("setSpace", &GeomPropDef::setSpace)
            .function("hasSpace", &GeomPropDef::hasSpace)
            .function("getSpace", &GeomPropDef::getSpace)
            .function("setIndex", &GeomPropDef::setIndex)
            .function("hasIndex", &GeomPropDef::hasIndex)
            .function("getIndex", &GeomPropDef::getIndex)
            .function("setAttrName", &GeomPropDef::setAttrName)
            .function("hasAttrName", &GeomPropDef::hasAttrName)
            .function("getAttrName", &GeomPropDef::getAttrName)
            .class_property("CATEGORY", &GeomPropDef::CATEGORY);

        class_<Collection, base<Element>>("Collection")
            .smart_ptr_constructor("Collection", &std::make_shared<Collection, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Collection>>("Collection")
            .function("setIncludeGeom", &Collection::setIncludeGeom)
            .function("hasIncludeGeom", &Collection::hasIncludeGeom)
            .function("getIncludeGeom", &Collection::getIncludeGeom)
            .function("setExcludeGeom", &Collection::setExcludeGeom)
            .function("hasExcludeGeom", &Collection::hasExcludeGeom)
            .function("getExcludeGeom", &Collection::getExcludeGeom)
            .function("setIncludeCollectionString", &Collection::setIncludeCollectionString)
            .function("hasIncludeCollectionString", &Collection::hasIncludeCollectionString)
            .function("getIncludeCollectionString", &Collection::getIncludeCollectionString)
            .function("setIncludeCollection", &Collection::setIncludeCollection)
            .function("setIncludeCollections", &Collection::setIncludeCollections)
            .function("getIncludeCollections", &Collection::getIncludeCollections)
            .function("hasIncludeCycle", &Collection::hasIncludeCycle)
            .function("matchesGeomString", &Collection::matchesGeomString)
            .class_property("CATEGORY", &Collection::CATEGORY);

        function("geomStringsMatch", &geomStringsMatch);
        
        function("UNIVERSAL_GEOM_NAME", optional_override([]() {
            return UNIVERSAL_GEOM_NAME;
        }));
        
    }
}