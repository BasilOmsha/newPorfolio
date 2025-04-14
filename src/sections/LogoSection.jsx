import LogoIcon from "../components/LogoIcon.jsx"
import { logoIconsList } from "../constants/index.js"

function LogoSection() {
    return (
        <div className="md:my-20 my-10 relative">
            <div className="grading-edge" />
            <div className="grading-edge" />

            <div className="marquee h-52">
                <div className="marquee-box md:gap-12 gap-5">
                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon} />
                    ))}

                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogoSection
