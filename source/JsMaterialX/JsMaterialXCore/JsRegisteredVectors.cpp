#include "helpers.h"
#include <MaterialXCore/Look.h>
#include <MaterialXCore/Material.h>
#include <MaterialXCore/Variant.h>
#include <MaterialXCore/Node.h>
#include <MaterialXCore/Interface.h>
#include <MaterialXCore/Document.h>
#include <MaterialXCore/Definition.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(registered_vectors)
    {
        register_vector<string>("vector<string>");
        register_vector<int>("vector<int>");
        register_vector<VariantPtr>("vector<VariantPtr>");
        register_vector<VariantAssignPtr>("vector<VariantAssignPtr>");
        register_vector<VariantSetPtr>("vector<VariantSetPtr>");
        register_vector<ElementPtr>("vector<ElementPtr>");
        register_vector<PortElementPtr>("vector<PortElementPtr>");
        register_vector<ValueElementPtr>("vector<ValueElementPtr>");
        register_vector<InterfaceElementPtr>("vector<InterfaceElementPtr>");
        register_vector<BackdropPtr>("vector<BackdropPtr>");
        register_vector<MaterialAssignPtr>("vector<MaterialAssignPtr>");
        register_vector<MaterialPtr>("vector<MaterialPtr>");
        register_vector<PropertyAssignPtr>("vector<PropertyAssignPtr>");
        register_vector<PropertySetAssignPtr>("vector<PropertySetAssignPtr>");
        register_vector<VisibilityPtr>("vector<VisibilityPtr>");
        register_vector<ParameterPtr>("vector<ParameterPtr>");
        register_vector<InputPtr>("vector<InputPtr>");
        register_vector<OutputPtr>("vector<OutputPtr>");
        register_vector<TokenPtr>("vector<TokenPtr>");
        register_vector<NodePtr>("vector<NodePtr>");
        register_vector<NodeGraphPtr>("vector<NodeGraphPtr>");
        register_vector<NodeDefPtr>("vector<NodeDefPtr>");
        register_vector<TypeDefPtr>("vector<TypeDefPtr>");
        register_vector<ImplementationPtr>("vector<ImplementationPtr>");
        register_vector<UnitTypeDefPtr>("vector<UnitTypeDefPtr>");
        register_vector<MemberPtr>("vector<MemberPtr>");
        register_vector<UnitPtr>("vector<UnitPtr>");
        register_vector<UnitDefPtr>("vector<UnitDefPtr>");
        register_vector<ShaderRefPtr>("vector<ShaderRefPtr>");
        register_vector<BindParamPtr>("vector<BindParamPtr>");
        register_vector<BindInputPtr>("vector<BindInputPtr>");
        register_vector<BindTokenPtr>("vector<BindTokenPtr>");
        register_vector<GeomInfoPtr>("vector<GeomInfoPtr>");
        register_vector<GeomPropDefPtr>("vector<GeomPropDefPtr>");
        register_vector<LookPtr>("vector<LookPtr>");
        register_vector<LookGroupPtr>("vector<LookGroupPtr>");
        register_vector<CollectionPtr>("vector<CollectionPtr>");
        register_vector<PropertySetPtr>("vector<PropertySetPtr>");
    }
}