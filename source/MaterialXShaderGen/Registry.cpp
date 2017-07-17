#include <MaterialXShaderGen/Registry.h>

#include <MaterialXShaderGen/ShaderGenerators/ArnoldShaderGenerator.h>
#include <MaterialXShaderGen/ShaderGenerators/OgsFxShaderGenerator.h>

#include <MaterialXShaderGen/NodeImplementations/VDirectionImpl.h>
#include <MaterialXShaderGen/NodeImplementations/SwizzleImpl.h>

namespace MaterialX
{

Factory<ShaderGenerator> Registry::_shaderGeneratorFactory;
unordered_map<string, ShaderGeneratorPtr> Registry::_shaderGenerators;

Factory<NodeImplementation> Registry::_implementationFactory;
unordered_map<string, NodeImplementationPtr> Registry::_implementations;

void Registry::registerShaderGenerator(const string& language, const string& target, CreatorFunc<ShaderGenerator> f)
{
    const string id = ShaderGenerator::id(language, target);
    _shaderGeneratorFactory.registerClass(id, f);
}

void Registry::unregisterShaderGenerator(const string& language, const string& target)
{
    const string id = ShaderGenerator::id(language, target);
    _shaderGeneratorFactory.unregisterClass(id);
    _shaderGenerators.erase(id);
}

void Registry::registerNodeImplementation(const string& node, const string& language, const string& target, CreatorFunc<NodeImplementation> f)
{
    const string id = NodeImplementation::id(node, language, target);
    _implementationFactory.registerClass(id, f);
}

void Registry::unregisterNodeImplementation(const string& node, const string& language, const string& target)
{
    const string id = NodeImplementation::id(node, language, target);
    _implementationFactory.unregisterClass(id);
    _implementations.erase(id);
}

ShaderGeneratorPtr Registry::findShaderGenerator(const string& language, const string& target)
{
    // First, search only by language
    ShaderGeneratorPtr ptr = findShaderGeneratorById(ShaderGenerator::id(language));
    if (ptr != nullptr)
    {
        return ptr;
    }

    // Second, search by language and target
    return findShaderGeneratorById(ShaderGenerator::id(language, target));
}

NodeImplementationPtr Registry::findNodeImplementation(const string& node, const string& language, const string& target)
{
    // First, search only by node name
    NodeImplementationPtr ptr = findNodeImplementationById(NodeImplementation::id(node));
    if (ptr != nullptr)
    {
        return ptr;
    }

    // Second, search by node name and language
    ptr = findNodeImplementationById(NodeImplementation::id(node, language));
    if (ptr != nullptr)
    {
        return ptr;
    }

    // Third, search by node name, language and target
    return findNodeImplementationById(NodeImplementation::id(node, language, target));
}

ShaderGeneratorPtr Registry::findShaderGeneratorById(const string& id)
{
    auto it = _shaderGenerators.find(id);
    if (it != _shaderGenerators.end())
    {
        return it->second;
    }

    ShaderGeneratorPtr generatorPtr = _shaderGeneratorFactory.create(id);
    if (generatorPtr)
    {
        _shaderGenerators[id] = generatorPtr;
    }

    return generatorPtr;
}

NodeImplementationPtr Registry::findNodeImplementationById(const string& id)
{
    auto it = _implementations.find(id);
    if (it != _implementations.end())
    {
        return it->second;
    }

    NodeImplementationPtr nodePtr = _implementationFactory.create(id);
    if (nodePtr)
    {
        _implementations[id] = nodePtr;
    }

    return nodePtr;
}


#define REGISTER_SHADER_GENERATOR(T)   \
    registerShaderGenerator(T::kLanguage, T::kTarget, T::creator);
#define REGISTER_NODE_IMPLEMENTATION(T)        \
    registerNodeImplementation(T::kNode, T::kLanguage, T::kTarget, T::creator);

#define UNREGISTER_SHADER_GENERATOR(T) \
    unregisterShaderGenerator(T::kLanguage, T::kTarget);
#define UNREGISTER_NODE_IMPLEMENTATION(T)      \
    unregisterNodeImplementation(T::kNode, T::kLanguage, T::kTarget);

void Registry::registerBuiltIn()
{
    REGISTER_SHADER_GENERATOR(ArnoldShaderGenerator);
    REGISTER_SHADER_GENERATOR(OgsFxShaderGenerator);

    REGISTER_NODE_IMPLEMENTATION(VDirectionImplFlipOsl);
    REGISTER_NODE_IMPLEMENTATION(VDirectionImplNoOpOsl);
    REGISTER_NODE_IMPLEMENTATION(VDirectionImplFlipGlsl);
    REGISTER_NODE_IMPLEMENTATION(VDirectionImplNoOpGlsl);
    REGISTER_NODE_IMPLEMENTATION(SwizzleImpl);
}

void Registry::unregisterBuiltIn()
{
    UNREGISTER_SHADER_GENERATOR(ArnoldShaderGenerator);
    UNREGISTER_SHADER_GENERATOR(OgsFxShaderGenerator);

    UNREGISTER_NODE_IMPLEMENTATION(VDirectionImplFlipOsl);
    UNREGISTER_NODE_IMPLEMENTATION(VDirectionImplNoOpOsl);
    UNREGISTER_NODE_IMPLEMENTATION(VDirectionImplFlipGlsl);
    UNREGISTER_NODE_IMPLEMENTATION(VDirectionImplNoOpGlsl);
    UNREGISTER_NODE_IMPLEMENTATION(SwizzleImpl);
}


} // namepsace MaterialX
