import { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import NavBar from "./components/NavBar.jsx"
import Contact from "./sections/Contact.jsx"
import ExperienceSection from "./sections/ExperienceSection.jsx"
import FeatureCards from "./sections/FeatureCards.jsx"
import Footer from "./sections/Footer.jsx"
import Hero from "./sections/Hero.jsx"
import LogoSection from "./sections/LogoSection.jsx"
import ShowcaseSection from "./sections/ShowcaseSection.jsx"
import TechStack from "./sections/TechStack.jsx"
import Testimonials from "./sections/Testimonials.jsx"

function App() {
    const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" })

    useEffect(() => {
        // Only apply cursor effect if on desktop
        if (isDesktop) {
            const cursor = document.getElementById("cursor")

            if (cursor) {
                const handleMouseMove = (e) => {
                    cursor.style.left = e.clientX + "px"
                    cursor.style.top = e.clientY + "px"
                }

                document.body.addEventListener("mousemove", handleMouseMove)

                // Clean up the event listener when component unmounts
                return () => {
                    document.body.removeEventListener("mousemove", handleMouseMove)
                }
            }
        }
    }, [isDesktop])
    return (
        <>
            {isDesktop && <div class="cursor" id="cursor"></div>}
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <TechStack />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    )
}

export default App
