#include "helpers.h"
#include <MaterialXCore/Variant.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(variant)
    {
        class_<Variant, base<InterfaceElement>>("Variant")
            .smart_ptr_constructor("Variant", &std::make_shared<Variant, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Variant>>("Variant")
            .class_property("CATEGORY", &Variant::CATEGORY);

        class_<VariantSet, base<Element>>("VariantSet")
            .smart_ptr_constructor("VariantSet", &std::make_shared<VariantSet, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const VariantSet>>("VariantSet")
            .function("addVariant", &VariantSet::addVariant)
            .function("getVariant", &VariantSet::getVariant)
            .function("getVariants", &VariantSet::getVariants)
            .function("removeVariant", &VariantSet::removeVariant)
            .class_property("CATEGORY", &VariantSet::CATEGORY);

        class_<VariantAssign, base<Element>>("VariantAssign")
            .smart_ptr_constructor("VariantAssign", &std::make_shared<VariantAssign, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const VariantAssign>>("VariantAssign")
            .function("setVariantSetString", &VariantAssign::setVariantSetString)
            .function("hasVariantSetString", &VariantAssign::hasVariantSetString)
            .function("getVariantSetString", &VariantAssign::getVariantSetString)
            .function("setVariantString", &VariantAssign::setVariantString)
            .function("hasVariantString", &VariantAssign::hasVariantString)
            .function("getVariantString", &VariantAssign::getVariantString)
            .class_property("CATEGORY", &VariantAssign::CATEGORY);
    }
}