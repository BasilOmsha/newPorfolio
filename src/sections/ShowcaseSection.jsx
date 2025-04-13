import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

function ShowcaseSection() {
    const sectionRef = useRef(null)
    const tskMngRef = useRef(null)
    const prflRef = useRef(null)
    const ycDirectoryRef = useRef(null)

    useGSAP(() => {
        // Animation for the main section. Fade in effect
        gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })

        // Animations for each app showcase.
        const cards = [tskMngRef.current, prflRef.current, ycDirectoryRef.current]

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100"
                    }
                }
            )
        })
    }, [])

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* left */}
                    <div ref={tskMngRef} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/project2.png" alt="Task Managment System" />
                        </div>
                        <div className="text-content">
                            <h2>Task Management System</h2>
                            <p className="text-white-50 md:text-xl">
                                A task management system built with React, ASP .NET CORE (C#), and
                                PostgreSQL database. It allows users to create workspaces, create
                                projects within a workspace, and create tasks within a project in a
                                kanban board.
                            </p>
                            {/* <p className="text-white-50 md:text-xl">
                                A simple portfolio website built with React Three Fiber to practice
                                3D Programing.
                            </p> */}
                        </div>
                    </div>
                    {/* right */}
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={prflRef}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img src="/images/project1.png" alt="Portfolio" className="image" />
                            </div>
                            <h2>Simple R3F Portfolio</h2>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <div className="image-wrapper bg-[#FFE7EB]">
                                <img src="/images/project3.png" alt="YC Directory App" />
                            </div>
                            <h2>YC Directory - A Startup Showcase App</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowcaseSection
