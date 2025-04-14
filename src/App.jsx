import NavBar from "./components/NavBar.jsx"
import ExperienceSection from "./sections/ExperienceSection.jsx"
import FeatureCards from "./sections/FeatureCards.jsx"
import Hero from "./sections/Hero.jsx"
import LogoSection from "./sections/LogoSection.jsx"
import ShowcaseSection from "./sections/ShowcaseSection.jsx"
import TechStack from "./sections/TechStack.jsx"

function App() {
    return (
        <>
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <TechStack />
        </>
    )
}

export default App
