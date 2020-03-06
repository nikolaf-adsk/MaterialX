#include "helpers.h"
#include <MaterialXCore/Look.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(look)
    {
        class_<Look, base<Element>>("Look")
            .smart_ptr_constructor("Look", &std::make_shared<Look, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Look>>("Look")
            /** TODO: unbound types: N9MaterialX11GeomElementE" */
            .function("addMaterialAssign", &Look::addMaterialAssign)
            .function("getMaterialAssign", &Look::getMaterialAssign)
            .function("getMaterialAssigns", &Look::getMaterialAssigns)
            .function("getActiveMaterialAssigns", &Look::getActiveMaterialAssigns)
            .function("removeMaterialAssign", &Look::removeMaterialAssign)
            /***************************************************/

            /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX14PropertyAssignEEE" */
            .function("addPropertyAssign", &Look::addPropertyAssign) 
            .function("getPropertyAssign", &Look::getPropertyAssign)
            .function("getPropertyAssigns", &Look::getPropertyAssigns)
            .function("getActivePropertyAssigns", &Look::getActivePropertyAssigns)
            .function("removePropertyAssign", &Look::removePropertyAssign)
            /*****************************************************************************/
            
            /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX17PropertySetAssignEEE" */
            .function("addPropertySetAssign", &Look::addPropertySetAssign)
            .function("getPropertySetAssign", &Look::getPropertySetAssign)
            .function("getPropertySetAssigns", &Look::getPropertySetAssigns)
            .function("getActivePropertySetAssigns", &Look::getActivePropertySetAssigns)
            .function("removePropertySetAssign", &Look::removePropertySetAssign)
            /*********************************************************************************/

            /** TODO: unbound types: NSt3__210shared_ptrIN9MaterialX13VariantAssignEEE" */
            .function("addVariantAssign", &Look::addVariantAssign)
            .function("getVariantAssign", &Look::getVariantAssign)
            .function("getVariantAssigns", &Look::getVariantAssigns)
            .function("getActiveVariantAssigns", &Look::getActiveVariantAssigns)
            .function("removeVariantAssign", &Look::removeVariantAssign)
            /****************************************************************************/

            /** TODO: unbound types: N9MaterialX11GeomElementE" */
            .function("addVisibility", &Look::addVisibility)
            //  arg("name") = EMPTY_STRING)
            .function("getVisibility", &Look::getVisibility)
            .function("getVisibilities", &Look::getVisibilities)
            .function("getActiveVisibilities", &Look::getActiveVisibilities)
            .function("removeVisibility", &Look::removeVisibility)
            /****************************************************/

            .class_property("CATEGORY", &Look::CATEGORY);

        class_<LookGroup, base<Element>>("LookGroup")
            .smart_ptr_constructor("LookGroup", &std::make_shared<LookGroup, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const LookGroup>>("LookGroup")
            .function("getLooks", &LookGroup::getLooks)
            .function("setLooks", &LookGroup::setLooks)
            .function("getActiveLook", &LookGroup::getActiveLook)
            .function("setActiveLook", &LookGroup::setActiveLook)
            .class_property("CATEGORY", &LookGroup::CATEGORY)
            .class_property("LOOKS_ATTRIBUTE", &LookGroup::LOOKS_ATTRIBUTE)
            .class_property("ACTIVE_ATTRIBUTE", &LookGroup::ACTIVE_ATTRIBUTE);

        class_<MaterialAssign, base<GeomElement>>("MaterialAssign")
            .smart_ptr_constructor("MaterialAssign", &std::make_shared<MaterialAssign, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const MaterialAssign>>("MaterialAssign")
            /** TODO: unbound types: N9MaterialX11GeomElementE" */
            .function("setMaterial", &MaterialAssign::setMaterial)
            .function("hasMaterial", &MaterialAssign::hasMaterial)
            .function("getMaterial", &MaterialAssign::getMaterial)
            .function("setExclusive", &MaterialAssign::setExclusive)
            .function("getExclusive", &MaterialAssign::getExclusive)
            .function("getReferencedMaterial", &MaterialAssign::getReferencedMaterial)
            .function("getReferencedMaterialNode", &MaterialAssign::getReferencedMaterialNode)
            /***************************************************/
            .class_property("CATEGORY", &MaterialAssign::CATEGORY);

        class_<Visibility, base<GeomElement>>("Visibility")
            .smart_ptr_constructor("Visibility", &std::make_shared<Visibility, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Visibility>>("Visibility")
            /** TODO: unbound types: N9MaterialX11GeomElementE" */
            .function("setViewerGeom", &Visibility::setViewerGeom)
            .function("hasViewerGeom", &Visibility::hasViewerGeom)
            .function("getViewerGeom", &Visibility::getViewerGeom)
            .function("setViewerCollection", &Visibility::setViewerCollection)
            .function("hasViewerCollection", &Visibility::hasViewerCollection)
            .function("getViewerCollection", &Visibility::getViewerCollection)
            .function("setVisibilityType", &Visibility::setVisibilityType)
            .function("hasVisibilityType", &Visibility::hasVisibilityType)
            .function("getVisibilityType", &Visibility::getVisibilityType)
            .function("setVisible", &Visibility::setVisible)
            .function("getVisible", &Visibility::getVisible)
            /***************************************************/
            .class_property("CATEGORY", &Visibility::CATEGORY);

        // register_vector<MaterialAssignPtr>("vector<MaterialAssignPtr>");
        // register_vector<PropertyAssignPtr>("vector<PropertyAssignPtr>");

        
    }
}