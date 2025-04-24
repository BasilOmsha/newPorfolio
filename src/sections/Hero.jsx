import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import AnimatedCounter from "../components/AnimatedCounter.jsx"
import Button from "../components/Button.jsx"
import HeroExperience from "../components/models/hero-models/HeroExperience.jsx"
import { words } from "../constants"

function Hero() {
    // GSAP Animation for the Hero Text
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        )
    })

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
                    {/* <img src="/images/bg2.png" alt="Background" height="20px" /> */}
                </div>

                <div className="hero-layout">
                    {/* LEFT SIDE: Hero Content */}
                    <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                        <div className="flex flex-col gap-7">
                            <div className="hero-text">
                                <h1>
                                    Shaping
                                    <span className="slide">
                                        <span className="wrapper">
                                            {words.map((word, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center md:gap-3 gap-1 pb-2"
                                                >
                                                    <img
                                                        src={word.imgPath}
                                                        alt="person"
                                                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                    />
                                                    <span>{word.text}</span>
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                </h1>
                                <h1>into Real Projects</h1>
                                <h1>that Deliver Results</h1>
                            </div>

                            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                                Hi, I’m Basil, a developer based in Finland with a passion for code.
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
                        <div className="hero-3d-layout">
                            <HeroExperience isActive={true} />
                        </div>
                    </figure>
                </div>
            </section>
            <AnimatedCounter />
        </>
    )
}

export default Hero
