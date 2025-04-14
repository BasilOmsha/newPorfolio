import NavBar from "./components/NavBar.jsx"
import FeatureCards from "./sections/FeatureCards.jsx"
import Hero from "./sections/Hero.jsx"
import LogoSection from "./sections/LogoSection.jsx"
import ShowcaseSection from "./sections/ShowcaseSection.jsx"

function App() {
    return (
        <>
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
        </>
    )
}

export default App
