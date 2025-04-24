import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"

import { Suspense } from "react"
import Nature from "./Nature.jsx"
// import { Nature2 } from "./Nature2.jsx"
import Particles from "./Particles.jsx"

const HeroExperience = ({ isActive }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
    // const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

    return (
        <Canvas flat camera={{ position: [3, 30, 40], fov: 30 }}>
            {/* <Canvas flat camera={{ position: [-10.5, -30.5, 55], fov: 45 }}> */}
            {/* deep blue ambient */}
            <ambientLight intensity={0.2} color="#1a1a40" />
            {/* Configure OrbitControls to disable panning and control zoom based on device type */}
            {isActive && (
                <OrbitControls
                    enablePan={false} // Prevents panning of the scene
                    // enableZoom={!isTablet} // Disables zoom on tablets
                    maxDistance={200} // Maximum distance for zooming out
                    minDistance={5} // Minimum distance for zooming in
                    minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
                    maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
                />
            )}
            <Suspense fallback={null}>
                {/* <HeroLights /> */}
                <Particles count={100} />
                <group
                    scale={isMobile ? 0.9999 : 1}
                    position={isMobile ? [0.5, -2.5, 0.5] : [0, 0, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    {/* <Room /> */}
                    <Nature />
                </group>
            </Suspense>
        </Canvas>
    )
}

export default HeroExperience
