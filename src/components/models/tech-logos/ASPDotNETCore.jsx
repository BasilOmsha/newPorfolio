import { Center, Environment, Float, OrbitControls, Text3D } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

function ASPDotNETCore() {
    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
            <Environment preset="city" />
            <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
                <group>
                    <Center>
                        <Text3D
                            font={"/gt.json"}
                            size={1.1}
                            width={12}
                            height={0.5}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.05}
                            bevelSize={0.02}
                            bevelSegments={5}
                        >
                            {`ASP\n  .NET\n Core`}
                            <meshStandardMaterial
                                wireframe="true"
                                color="#ffffff"
                                metalness={0.8}
                                roughness={0.4}
                            />
                        </Text3D>
                    </Center>
                    <OrbitControls enableZoom={false} />
                </group>
            </Float>
        </Canvas>
    )
}

export default ASPDotNETCore
