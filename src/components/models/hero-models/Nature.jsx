import { shaderMaterial, useGLTF, useTexture } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import portalVertexShader from "./shaders/portal/vertex.glsl"
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#ffffff"),
        uColorEnd: new THREE.Color("#75ba4f")
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

function Nature() {
    const { nodes } = useGLTF("/models/nature2.glb")
    console.log("model", nodes)

    const bakedTexture = useTexture("/images/textures/bakedNature2.jpg")
    bakedTexture.flipY = false // Fixes the texture flipping issue
    console.log("bakedTexture", bakedTexture)

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta * 2
    })

    return (
        <>
            <mesh
                geometry={nodes.baked.geometry}
                material={nodes.baked.material}
                position={nodes.baked.position}
                rotation={nodes.baked.rotation}
            >
                <meshBasicMaterial
                    map={bakedTexture}
                    // transparent={true}
                    opacity={1}
                    color="#ffffff"
                />
            </mesh>
            <mesh
                geometry={nodes.Icosphere.geometry}
                material={nodes.Icosphere.material}
                position={nodes.Icosphere.position}
                rotation={nodes.Icosphere.rotation}
            />
            {/* <mesh
                geometry={nodes.fog.geometry}
                material={nodes.fog.material}
                position={nodes.fog.position}
                rotation={nodes.fog.rotation}
                scene={{ fog: new THREE.Fog(0xcccccc, 10, 15) }}
            >
                <meshStandardMaterial transparent={true} opacity={0.9} color="#ffffff" />
            </mesh> */}
            <mesh
                geometry={nodes.Turbulence.geometry}
                material={nodes.Turbulence.material}
                position={nodes.Turbulence.position}
                rotation={nodes.Turbulence.rotation}
            />
            <mesh
                geometry={nodes.Dust_emitter.geometry}
                material={nodes.Dust_emitter.material}
                position={nodes.Dust_emitter.position}
                rotation={nodes.Dust_emitter.rotation}
            />
            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
                scale={nodes.portalLight.scale}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>
            <mesh
                geometry={nodes.FireEmitter_botom.geometry}
                position={nodes.FireEmitter_botom.position}
                rotation={nodes.FireEmitter_botom.rotation}
                scale={nodes.FireEmitter_botom.scale}
                material={nodes.FireEmitter_botom.material}
            />
        </>
    )
}

export default Nature
useGLTF.preload("/models/nature2.glb")
