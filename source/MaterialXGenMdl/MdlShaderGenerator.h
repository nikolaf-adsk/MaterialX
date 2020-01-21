//
// TM & (c) 2017 Lucasfilm Entertainment Company Ltd. and Lucasfilm Ltd.
// All rights reserved.  See LICENSE.txt for license.
//

#ifndef MATERIALX_MDLSHADERGENERATOR_H
#define MATERIALX_MDLSHADERGENERATOR_H

/// @file
/// MDL shading language generator

#include <MaterialXGenShader/ShaderGenerator.h>

namespace MaterialX
{

using MdlShaderGeneratorPtr = shared_ptr<class MdlShaderGenerator>;

/// @class MdlShaderGenerator
/// Shader generator for MDL (Material Definition Language).
class MdlShaderGenerator : public ShaderGenerator
{
  public:
    MdlShaderGenerator();

    static ShaderGeneratorPtr create() { return std::make_shared<MdlShaderGenerator>(); }

    /// Return a unique identifier for the language used by this generator
    const string& getLanguage() const override { return LANGUAGE; }

    /// Return a unique identifier for the target this generator is for
    const string& getTarget() const override { return TARGET; }

    /// Generate a shader starting from the given element, translating
    /// the element and all dependencies upstream into shader code.
    ShaderPtr generate(const string& name, ElementPtr element, GenContext& context) const override;

    /// Add all function calls for a graph.
    void emitFunctionCalls(const ShaderGraph& graph, GenContext& context, ShaderStage& stage) const override;

    /// Unique identifier for the MDL language
    static const string LANGUAGE;

    /// Unique identifier for this generator target
    static const string TARGET;

protected:

    /// Create and initialize a new MDL shader for shader generation.
    virtual ShaderPtr createShader(const string& name, ElementPtr element, GenContext& context) const;

    /// Emit include headers needed by the generated shader code.
    virtual void emitIncludes(ShaderStage& stage, GenContext& context) const;

    /// Emit a block of shader inputs.
    virtual void emitShaderInputs(const VariableBlock& inputs, ShaderStage& stage) const;

    /// Emit a block of shader outputs.
    virtual void emitShaderOutputs(const VariableBlock& inputs, ShaderStage& stage) const;
};

namespace MDL
{
    /// Identifiers for MDL variable blocks
    extern const string UNIFORMS;
    extern const string INPUTS;
    extern const string OUTPUTS;
}

} // namespace MaterialX

#endif
