//
// TM & (c) 2017 Lucasfilm Entertainment Company Ltd. and Lucasfilm Ltd.
// All rights reserved.  See LICENSE.txt for license.
//

#ifndef MATERIALX_GENOPTIONS_H
#define MATERIALX_GENOPTIONS_H

/// @file
/// Shader generation options class

#include <MaterialXGenShader/Library.h>

namespace MaterialX
{

/// Type of shader interface to be generated
enum ShaderInterfaceType
{
    /// Create a complete interface with uniforms for all
    /// editable inputs on all nodes used by the shader.
    /// This interface makes the shader fully editable by
    /// value without requiring any rebuilds.
    /// This is the default interface type.
    SHADER_INTERFACE_COMPLETE,

    /// Create a reduced interface with uniforms only for
    /// the inputs that has been declared in the shaders
    /// nodedef interface. If values on other inputs are
    /// changed the shader needs to be rebuilt.
    SHADER_INTERFACE_REDUCED
};


/// Method to use for directional albedo evaluation
enum DirectionalAlbedoMethod
{
    /// Use a curve fit approximation for directional albedo.
    DIRECTIONAL_ALBEDO_CURVE_FIT,

    /// Use a table look-up for directional albedo.
    DIRECTIONAL_ALBEDO_TABLE,

    /// Use importance sampling for directional albedo.
    DIRECTIONAL_ALBEDO_IS
};

/// Method to use for specular environment lighting
enum HwSpecularEnvironmentMethod
{
    /// Do not use specular environment maps
    SPECULAR_ENVIRONMENT_NONE,

    /// Use Filtered Importance Sampling for
    /// specular environment/indirect lighting.
    SPECULAR_ENVIRONMENT_FIS,

    /// Use pre-filtered environment maps for
    /// specular environment/indirect lighting.
    SPECULAR_ENVIRONMENT_PREFILTER
};

/// @class GenOptions 
/// Class holding options to configure shader generation.
class GenOptions
{
  public:
    GenOptions() :
        shaderInterfaceType(SHADER_INTERFACE_COMPLETE),
        fileTextureVerticalFlip(false),
        addUpstreamDependencies(true),
        directionalAlbedoMethod(DIRECTIONAL_ALBEDO_CURVE_FIT),
        writeDirectionalAlbedoTable(false),
        hwTransparency(false),
        hwSpecularEnvironmentMethod(SPECULAR_ENVIRONMENT_FIS),
        hwWriteDepthMoments(false),
        hwShadowMap(false),
        hwAmbientOcclusion(false),
        hwMaxActiveLightSources(3),
        hwNormalizeUdimTexCoords(false)
    {
    }
    virtual ~GenOptions() { }

    // TODO: Add options for:
    //  - shader gen optimization level
    //  - graph flattening or not

    /// Sets the type of shader interface to be generated
    int shaderInterfaceType;

    /// If true the y-component of texture coordinates used for sampling
    /// file textures will be flipped before sampling. This can be used if
    /// file textures need to be flipped vertically to match the target's
    /// texture space convention. By default this option is false.
    bool fileTextureVerticalFlip;

    /// An optional override for the target color space.
    /// Shader fragments will be generated to transform
    /// input values and textures into this color space.
    string targetColorSpaceOverride;

    /// Define the target distance unit.
    /// Shader fragments will be generated to transform
    /// input distance values to the given unit.
    string targetDistanceUnit;
    
    /// Sets whether to include upstream dependencies 
    /// for the element to generate a shader for.
    bool addUpstreamDependencies;

    /// Sets the method to use for directional albedo evaluation
    /// if needed for a shader target.
    DirectionalAlbedoMethod directionalAlbedoMethod;

    /// Enables the writing of a directional albedo table.
    /// Defaults to false.
    bool writeDirectionalAlbedoTable;

    /// Sets if transparency is needed or not for HW shaders.
    /// If a surface shader has potential of being transparent
    /// this must be set to true, otherwise no transparency
    /// code fragments will be generated for the shader and
    /// the surface will be fully opaque.
    bool hwTransparency;

    /// Sets the method to use for specular environment lighting
    /// for HW shader targets.
    HwSpecularEnvironmentMethod hwSpecularEnvironmentMethod;

    /// Enables the writing of depth moments for HW shader targets.
    /// Defaults to false.
    bool hwWriteDepthMoments;

    /// Enables shadow mapping for HW shader targets.
    /// Defaults to false.
    bool hwShadowMap;

    /// Enables ambient occlusion rendering for HW shader targets.
    /// Defaults to false.
    bool hwAmbientOcclusion;

    /// Sets the maximum number of light sources that can
    /// be active at once.
    unsigned int hwMaxActiveLightSources;

    /// Sets whether to transform texture coordinates to normalize
    /// uv space when UDIMs images are bound to an image. Can be
    /// enabled for when texture atlas generation is performed to
    /// compress a set of UDIMs into a single normalized image for
    /// hardware rendering.
    bool hwNormalizeUdimTexCoords;
};

} // namespace MaterialX

#endif
