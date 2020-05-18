#include "../helpers.h"
#include <MaterialXFormat/XmlIo.h>
#include <MaterialXCore/Document.h>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

namespace mx = MaterialX;

using namespace mx;

extern "C"
{
    EMSCRIPTEN_BINDINGS(xmlio)
    {
        class_<XmlReadOptions, base<CopyOptions>>("XmlReadOptions")
            .constructor<>()
            .property("readXIncludeFunction", &XmlReadOptions::readXIncludeFunction)
            .property("parentXIncludes", &XmlReadOptions::parentXIncludes);
        class_<XmlWriteOptions>("XmlWriteOptions")
            .constructor<>()
            .property("writeXIncludeEnable", &XmlWriteOptions::writeXIncludeEnable)
            .property("elementPredicate", &XmlWriteOptions::elementPredicate);

        function("readFromXmlString", optional_override([](DocumentPtr doc, string str, XmlReadOptions readOptions = XmlReadOptions()) {
                     return readFromXmlString(doc, (const string &)str, (const XmlReadOptions *)&readOptions);
                 }));

        function("writeToXmlString", optional_override([](DocumentPtr doc, XmlWriteOptions writeOptions = XmlWriteOptions()) {
                     return writeToXmlString(doc, (const XmlWriteOptions *)&writeOptions);
                 }));

        // // The argument overrides do not work. Thus this needs to be done in the Javascript wrapper.
        // function("readFromXmlFileBase", optional_override([](DocumentPtr doc, FilePath filename, FileSearchPath searchPath = FileSearchPath(), XmlReadOptions readOptions = XmlReadOptions()) {
        //              return readFromXmlFile(doc, (const FilePath &)filename, (const FileSearchPath &)searchPath, (const XmlReadOptions *)&readOptions);
        //          }));
        // function("writeToXmlFile", optional_override([](DocumentPtr doc, FilePath filename, XmlWriteOptions writeOptions = XmlWriteOptions()) {
        //              return writeToXmlFile(doc, (const FilePath &)filename, (const XmlWriteOptions *)&writeOptions);
        //          }));
        // function("prependXInclude", optional_override([](DocumentPtr doc, FilePath filename) {
        //              return prependXInclude(doc, (const FilePath &)filename);
        //          }));
    }
}