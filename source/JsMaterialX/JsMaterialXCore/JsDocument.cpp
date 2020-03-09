#include "helpers.h"
#include <MaterialXCore/Document.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(document)
    {
        function("createDocument", &createDocument);
        class_<Document, base<GraphElement>>("Document")
            .smart_ptr_constructor("Document", &std::make_shared<Document, ElementPtr, const string &>)
            .smart_ptr<std::shared_ptr<const Document>>("Document")
            .function("initialize", &Document::initialize)
            .function("copy", &Document::copy)
            .function("importLibrary", optional_override([](Document &self, const ConstDocumentPtr &library, CopyOptions copyOptions) {
                          const CopyOptions *co = &copyOptions;
                          return self.Document::importLibrary(library, co);
                      }))
            .function("getReferencedSourceUris", optional_override([](Document &self) {
                          StringSet referenced = self.Document::getReferencedSourceUris();
                          int size = referenced.size();
                          return arrayToVec((string *)&referenced, size);
                      }))
            .function("addNodeGraph", &Document::addNodeGraph)
            .function("getNodeGraph", &Document::getNodeGraph)
            .function("getNodeGraphs", &Document::getNodeGraphs)
            .function("removeNodeGraph", &Document::removeNodeGraph)
            .function("getMatchingPorts", &Document::getMatchingPorts)
            .function("addMaterial", &Document::addMaterial)
            .function("getMaterial", &Document::getMaterial)
            .function("getMaterials", &Document::getMaterials)
            .function("removeMaterial", &Document::removeMaterial)
            .function("addGeomInfo", &Document::addGeomInfo)
            .function("getGeomInfo", &Document::getGeomInfo)
            .function("getGeomInfos", &Document::getGeomInfos)
            .function("removeGeomInfo", &Document::removeGeomInfo)
            .function("getGeomAttrValue", &Document::getGeomAttrValue)
            .function("addGeomPropDef", &Document::addGeomPropDef)
            .function("getGeomPropDef", &Document::getGeomPropDef)
            .function("getGeomPropDefs", &Document::getGeomPropDefs)
            .function("removeGeomPropDef", &Document::removeGeomPropDef)
            .function("addLook", &Document::addLook)
            .function("getLook", &Document::getLook)
            .function("getLooks", &Document::getLooks)
            .function("removeLook", &Document::removeLook)
            .function("addLookGroup", &Document::addLookGroup)
            .function("getLookGroup", &Document::getLookGroup)
            .function("getLookGroups", &Document::getLookGroups)
            .function("removeLookGroup", &Document::removeLookGroup)
            .function("addCollection", &Document::addCollection)
            .function("getCollection", &Document::getCollection)
            .function("getCollections", &Document::getCollections)
            .function("removeCollection", &Document::removeCollection)
            .function("addTypeDef", &Document::addTypeDef)
            .function("getTypeDef", &Document::getTypeDef)
            .function("getTypeDefs", &Document::getTypeDefs)
            .function("removeTypeDef", &Document::removeTypeDef)
            .function("addNodeDef", &Document::addNodeDef)
            .function("getNodeDef", &Document::getNodeDef)
            .function("getNodeDefs", &Document::getNodeDefs)
            .function("removeNodeDef", &Document::removeNodeDef)
            .function("getMatchingNodeDefs", &Document::getMatchingNodeDefs)
            .function("getMatchingImplementations", &Document::getMatchingImplementations)
            .function("addPropertySet", &Document::addPropertySet)
            .function("getPropertySet", &Document::getPropertySet)
            .function("getPropertySets", &Document::getPropertySets)
            .function("removePropertySet", &Document::removePropertySet)
            .function("addVariantSet", &Document::addVariantSet)
            .function("getVariantSet", &Document::getVariantSet)
            .function("getVariantSets", &Document::getVariantSets)
            .function("removeVariantSet", &Document::removeVariantSet)
            .function("addImplementation", &Document::addImplementation)
            .function("getImplementation", &Document::getImplementation)
            .function("getImplementations", &Document::getImplementations)
            .function("removeImplementation", &Document::removeImplementation)
            .function("addUnitDef", &Document::addUnitDef)
            .function("getUnitDef", &Document::getUnitDef)
            .function("getUnitDefs", &Document::getUnitDefs)
            .function("removeUnitDef", &Document::removeUnitDef)
            .function("addUnitTypeDef", &Document::addUnitTypeDef)
            .function("getUnitTypeDef", &Document::getUnitTypeDef)
            .function("getUnitTypeDefs", &Document::getUnitTypeDefs)
            .function("removeUnitTypeDef", &Document::removeUnitTypeDef)
            .function("upgradeVersion", &Document::upgradeVersion)
            .function("setColorManagementSystem", &Document::setColorManagementSystem)
            .function("hasColorManagementSystem", &Document::hasColorManagementSystem)
            .function("getColorManagementSystem", &Document::getColorManagementSystem)
            .function("setColorManagementConfig", &Document::setColorManagementConfig)
            .function("hasColorManagementConfig", &Document::hasColorManagementConfig)
            .function("getColorManagementConfig", &Document::getColorManagementConfig);
    }
}