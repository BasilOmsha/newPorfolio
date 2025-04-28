import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import AnimatedCounter from "../components/AnimatedCounter.jsx"
import Button from "../components/Button.jsx"
import HeroExperience from "../components/models/hero-models/HeroExperience.jsx"
import { words } from "../constants"

function Hero() {
    const [isActive, setIsActive] = useState(false)
    const [cameraProps, setCameraProps] = useState({ position: [3, 30, 40], fov: 30 })

    const handRef = useRef(null)
    const handIllustrationRef = useRef(null)
    const clickRef = useRef(null)
    const xButtonRef = useRef(null)
    const xIconRef = useRef(null)

    // GSAP Animation for the Hero Text
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        )
    })

    useEffect(() => {
        const container = clickRef.current
        if (!container) return

        const handleMouseDown = () => {
            container.style.cursor = "grabbing"
        }

        container.addEventListener("mousedown", handleMouseDown)
        return () => container.removeEventListener("mousedown", handleMouseDown)
    }, [isActive])

    // GSAP Animation for the hand
    useEffect(() => {
        if (isActive) return // Don't run the animation if active

        // Create a timeline for the hand animation
        const handTimeline = gsap.timeline({
            repeat: -1, // Infinite repeat
            repeatDelay: 1 // Pause between animations
        })

        // Animation for the hand illustration (switching between open and closed)
        handTimeline
            .to(handIllustrationRef.current, {
                backgroundPosition: "bottom left",
                duration: 0.2,
                ease: "power1.inOut"
            })
            .to(handRef.current, { x: -10, duration: 0.2 })
            .to(handRef.current, { x: 10, duration: 0.2 })
            .to(handRef.current, { x: 0, duration: 0.2 })
            .to(handIllustrationRef.current, {
                // Switch back to open hand
                backgroundPosition: "top left",
                duration: 0.2
            })

        return () => handTimeline.kill() // Clean up the timeline on unmount
    }, [isActive])

    // Handle hover animation for X button
    useEffect(() => {
        const xButton = xButtonRef.current
        const xIcon = xIconRef.current
        if (!xButton || !xIcon) return

        const handleMouseEnter = () => {
            gsap.to(xIcon, { rotation: 90, duration: 0.3, ease: "power2.out" })
        }
        const handleMouseLeave = () => {
            gsap.to(xIcon, { rotation: 0, duration: 0.3, ease: "power2.out" })
        }

        xButton.addEventListener("mouseenter", handleMouseEnter)
        xButton.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            xButton.removeEventListener("mouseenter", handleMouseEnter)
            xButton.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isActive])

    const handleHandClick = () => {
        setIsActive(true)
        setCameraProps({ position: [13, 30, 40], fov: 20 })
    }

    const handleXClick = () => {
        // Update camera position
        setCameraProps({ position: [3, 30, 40], fov: 30 })

        setTimeout(() => {
            setIsActive(false)
        }, 1500)
    }

    return (
        <>
            <section id="hero" className="relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 z-10 w-full h-full"
                    style={{
                        backgroundImage: "url('/images/bg2.png')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "cover"
                    }}
                >
                    {/* <img src="/images/bg.png" alt="Background" height="20px" /> */}
                </div>

                <div className="hero-layout">
                    {/* LEFT SIDE: Hero Content */}
                    <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                        <div className="flex flex-col gap-7">
                            <div className="hero-text">
                                <h1>From</h1>
                                <h1>
                                    curious
                                    <span className="slide">
                                        <span className="wrapper">
                                            {words.map((word, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center md:gap-3 gap-1 pb-2"
                                                >
                                                    <img
                                                        src={word.imgPath || "/placeholder.svg"}
                                                        alt="person"
                                                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                    />
                                                    <span>{word.text}</span>
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                </h1>
                                <h1> to boss-level bugs </h1>
                                <h1> I build projects </h1>
                                <h1> and level up with every line</h1>
                            </div>

                            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                                Hi, I'm Basil, a developer based in Finland with a passion for code.
                            </p>

                            <Button
                                text="See My Work"
                                className="md:w-80 md:h-16 w-60 h-12"
                                id="counter"
                            />
                        </div>
                    </header>

                    {/* RIGHT SIDE: 3D Model  */}
                    <figure>
                        <div className="hero-3d-layout" style={{ cursor: "grab" }}>
                            <HeroExperience
                                isActive={isActive}
                                cameraProps={cameraProps}
                                setCameraProps={setCameraProps}
                                setIsActive={setIsActive}
                            />

                            {/* Hand Button - shown when not active */}
                            {!isActive && (
                                <div
                                    ref={clickRef}
                                    className="click"
                                    // style={styles.click}
                                    onClick={handleHandClick}
                                >
                                    <div style={styles.arrowContainer}>
                                        <div style={{ ...styles.arrow, ...styles.isArrowLeft }}>
                                            <svg
                                                width="11"
                                                height="7"
                                                viewBox="0 0 11 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                                                    fill="#333"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div ref={handRef} style={styles.hand}>
                                        <div
                                            ref={handIllustrationRef}
                                            style={styles.handIllustration}
                                        ></div>
                                    </div>
                                    <div style={styles.arrowContainer}>
                                        <div style={{ ...styles.arrow, ...styles.isArrowRight }}>
                                            <svg
                                                width="11"
                                                height="7"
                                                viewBox="0 0 11 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.5 7C5.10218 7 4.72064 6.84197 4.43934 6.56066L0.439339 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.439339 0.43934C1.02513 -0.146446 1.97487 -0.146446 2.56066 0.43934L5.5 3.37868L8.43934 0.43934C9.02513 -0.146447 9.97487 -0.146447 10.5607 0.439339C11.1464 1.02513 11.1464 1.97487 10.5607 2.56066L6.56066 6.56066C6.27936 6.84197 5.89782 7 5.5 7Z"
                                                    fill="#333"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* X Button - shown when active */}
                            {isActive && (
                                <div
                                    ref={xButtonRef}
                                    className="x-button"
                                    style={styles.xButton}
                                    onClick={handleXClick}
                                >
                                    <div ref={xIconRef} style={styles.xIcon}>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13 1L1 13"
                                                stroke="#333"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M1 1L13 13"
                                                stroke="#333"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </figure>
                </div>
            </section>
            <AnimatedCounter />
        </>
    )
}

export default Hero

const styles = {
    click: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "45px",
        left: "calc(50% - 77px)",
        width: "154px",
        height: "52px",
        background: "#fff",
        borderRadius: "29px",
        boxShadow: "0 30px 70px #3c00bd22",
        willChange: "transform",
        cursor: "grab",
        zIndex: 3,
        userSelect: "none",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.5s"
    },
    xButton: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "160px",
        left: "calc(50% - 25px)",
        width: "50px",
        height: "50px",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 30px 70px #3c00bd22",
        willChange: "transform",
        cursor: "pointer",
        zIndex: 3,
        userSelect: "none",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.5s"
    },
    xIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        willChange: "transform"
    },
    arrowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px"
    },
    arrow: {
        position: "relative",
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    isArrowLeft: {
        transform: "rotate(90deg)"
    },
    isArrowRight: {
        transform: "rotate(-90deg)"
    },
    hand: {
        width: "30px",
        height: "30px",
        margin: "0 17px",
        overflow: "hidden"
    },
    handIllustration: {
        width: "30px",
        height: "30px",
        backgroundImage: "url(/images/hands.png)", // Make sure this image exists with open hand on top half, closed hand on bottom half
        backgroundSize: "30px 60px",
        backgroundPosition: "top left"
    }
}
