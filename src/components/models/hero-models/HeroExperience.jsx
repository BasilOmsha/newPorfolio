import { OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import gsap from "gsap"
import { Suspense, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"
import Nature from "./Nature.jsx"
// import { Room } from "./Room.jsx"
// import { Nature2 } from "./Nature2.jsx"
// import HeroLights from "./HeroLights.jsx"
import Particles from "./Particles.jsx"

const HeroExperience = ({ isActive, cameraProps, setCameraProps, setIsActive }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
    // const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
    const canvasContainerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    // Handle mouse events for cursor changes and activation
    useEffect(() => {
        const container = canvasContainerRef.current
        if (!container) return

        const handleMouseDown = () => {
            // Change cursor to grabbing
            container.style.cursor = "grabbing"
            setIsDragging(true)

            // Activate the experience if not already active
            if (!isActive) {
                setIsActive(true)
                setCameraProps({ position: [13, 30, 40], fov: 20 })
            }
        }

        const handleMouseUp = () => {
            // Change cursor back to grab
            container.style.cursor = "grab"
            setIsDragging(false)
        }

        const handleMouseLeave = () => {
            // Reset cursor when mouse leaves the container
            container.style.cursor = "grab"
            setIsDragging(false)
        }

        // Add event listeners
        container.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        container.addEventListener("mouseleave", handleMouseLeave)

        // Clean up event listeners
        return () => {
            container.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            container.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isActive, setIsActive])

    return (
        <Canvas
            flat
            camera={{
                position: [3, 30, 40],
                fov: 40
            }}
            ref={canvasContainerRef}
        >
            {/* Camera controller */}
            <Camera_Orbit_Control
                isActive={isActive}
                cameraProps={cameraProps}
                isDragging={isDragging}
            />

            {/* deep blue ambient */}
            <ambientLight intensity={0.2} color="#1a1a40" />

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

// Camera control component
function Camera_Orbit_Control({ isActive, cameraProps }) {
    const { camera } = useThree()

    // Update camera when cameraProps changes
    useEffect(() => {
        if (cameraProps) {
            // Animate camera position change
            if (cameraProps.position) {
                gsap.to(camera.position, {
                    x: cameraProps.position[0],
                    y: cameraProps.position[1],
                    z: cameraProps.position[2],
                    duration: 1.5,
                    ease: "power2.inOut"
                })
            }

            // Animate FOV change
            if (cameraProps.fov && camera.fov !== cameraProps.fov) {
                gsap.to(camera, {
                    fov: cameraProps.fov,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onUpdate: () => camera.updateProjectionMatrix()
                })
            }
        }
    }, [camera, cameraProps])

    // Render OrbitControls
    return (
        <OrbitControls
            enabled={isActive}
            enableDamping={true}
            dampingFactor={0.05}
            enablePan={false} // Prevents panning of the scene
            maxDistance={200} // Maximum distance for zooming out
            minDistance={5} // Minimum distance for zooming in
            minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
            maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
        />
    )
}

export default HeroExperience
