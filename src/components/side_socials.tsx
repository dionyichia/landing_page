import { cn } from "@/lib/utils";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type SideSocialsProps = {
    className?: string;
}

export default function SideSocials({className}: SideSocialsProps) {
    return (
        <div className={cn("flex flex-col items-center", className)}>
            <ul className="flex flex-col flex-nowrap gap-4 list-none">
                <li>
                    <FaGithub className="w-6 h-6 md:w-8 md:h-8 text-font hover:scale-105 filter grayscale hover:grayscale-0 transition-all" />
                </li>
                <li>
                    <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 filter grayscale text-font hover:scale-105 hover:grayscale-0 transition-all duration-200" />
                </li>
                <li>
                    <FaEnvelope className="w-6 h-6 md:w-8 md:h-8 filter text-font hover:scale-105 grayscale hover:grayscale-0 transition-all duration-200" />
                </li>
            </ul>
        </div>
    );
}