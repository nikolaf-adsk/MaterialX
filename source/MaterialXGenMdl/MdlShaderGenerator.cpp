//
// TM & (c) 2017 Lucasfilm Entertainment Company Ltd. and Lucasfilm Ltd.
// All rights reserved.  See LICENSE.txt for license.
//

#include <MaterialXGenMdl/MdlShaderGenerator.h>

#include <MaterialXGenMdl/MdlSyntax.h>

#include <MaterialXGenShader/GenContext.h>
#include <MaterialXGenShader/Shader.h>
#include <MaterialXGenShader/ShaderStage.h>
#include <MaterialXGenShader/Nodes/SwizzleNode.h>
#include <MaterialXGenShader/Nodes/ConvertNode.h>
#include <MaterialXGenShader/Nodes/CombineNode.h>
#include <MaterialXGenShader/Nodes/SwitchNode.h>
#include <MaterialXGenShader/Nodes/IfNode.h>
#include <MaterialXGenShader/Nodes/BlurNode.h>
#include <MaterialXGenShader/Nodes/SourceCodeNode.h>

namespace MaterialX
{

const string MdlShaderGenerator::LANGUAGE = "genmdl";
const string MdlShaderGenerator::TARGET = "mdl";

//
// MdlShaderGenerator methods
//

MdlShaderGenerator::MdlShaderGenerator() :
    ShaderGenerator(MdlSyntax::create())
{
}

ShaderPtr MdlShaderGenerator::generate(const string& , ElementPtr , GenContext& ) const
{ 
    return nullptr;
}

ShaderPtr MdlShaderGenerator::createShader(const string& , ElementPtr , GenContext& ) const
{
    return nullptr;
}

void MdlShaderGenerator::emitFunctionCalls(const ShaderGraph& , GenContext& , ShaderStage& ) const
{
}

void MdlShaderGenerator::emitIncludes(ShaderStage& , GenContext& ) const
{
}

void MdlShaderGenerator::emitShaderInputs(const VariableBlock& , ShaderStage& ) const
{
}

void MdlShaderGenerator::emitShaderOutputs(const VariableBlock& , ShaderStage& ) const
{
}

namespace MDL
{
    // Identifiers for MDL variable blocks
    const string UNIFORMS = "u";
    const string INPUTS   = "i";
    const string OUTPUTS  = "o";
}

} // namespace MaterialX
