import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type SideSocialsProps = {
    className?: string;
}

export default function SideSocials({className}: SideSocialsProps) {
    return (
        <div className={cn("flex flex-col items-center", className)}>
            <ul className="flex flex-col flex-nowrap gap-4 list-none">
                <li>
                    <Link 
                        href="https://github.com/dionyichia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-70" >
                        <FaGithub className="w-6 h-6 md:w-8 md:h-8 hover:scale-105 filter grayscale hover:grayscale-0 transition-all" />
                    </Link>
                </li>
                <li>
                    <Link 
                        href="https://www.linkedin.com/in/dionyichia/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-70" >
                        <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 filter grayscale hover:scale-105 hover:grayscale-0 transition-all duration-200" />
                    </Link>
                </li>
                <li>
                    <Link 
                        href="mailto:dionyichia@gmail.com?subject=Hello from your website&body=Hey Dion,%0D%0A%0D%0AI found your website and wanted to reach out..."
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-70" >
                        <FaEnvelope className="w-6 h-6 md:w-8 md:h-8 filter hover:scale-105 grayscale hover:grayscale-0 transition-all duration-200" />
                    </Link>
                </li>
            </ul>
        </div>
    );
}