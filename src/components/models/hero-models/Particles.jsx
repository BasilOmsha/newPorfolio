import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"

function Particles({ count = 200 }) {
    const mesh = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ],
                // Random offset for each particle to create natural movement
                offset: Math.random() * Math.PI * 2,
                // Different amplitude for each particle
                amplitude: Math.random() * 0.1 + 0.05,
                // Different frequencies for varied movement
                frequency: Math.random() * 0.5 + 0.5
            })
        }
        return temp
    }, [count])

    // Store initial positions for animation reference
    const initialPositions = useMemo(() => {
        const positions = new Float32Array(count * 3)
        particles.forEach((p, i) => {
            positions[i * 3] = p.position[0]
            positions[i * 3 + 1] = p.position[1]
            positions[i * 3 + 2] = p.position[2]
        })
        return positions
    }, [particles, count])

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        const positions = mesh.current.geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const particle = particles[i]

            // Small sine wave movement in all directions
            positions[i3] =
                initialPositions[i3] +
                Math.sin(time * particle.frequency + particle.offset) * particle.amplitude
            positions[i3 + 1] =
                initialPositions[i3 + 1] +
                Math.cos(time * particle.frequency + particle.offset) * particle.amplitude
            positions[i3 + 2] =
                initialPositions[i3 + 2] +
                Math.sin(time * particle.frequency * 0.7 + particle.offset) * particle.amplitude
        }

        mesh.current.geometry.attributes.position.needsUpdate = true
    })

    const positions = new Float32Array(count * 3)
    particles.forEach((p, i) => {
        positions[i * 3] = p.position[0]
        positions[i * 3 + 1] = p.position[1]
        positions[i * 3 + 2] = p.position[2]
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.05}
                transparent
                opacity={0.9}
                depthWrite={false}
            />
        </points>
    )
}

export default Particles
