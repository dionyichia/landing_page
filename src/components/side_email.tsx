import { cn } from "@/lib/utils";
import Link from "next/link";

type SideEmailProps = {
    className?: string;
}

export default function SideEmail({className}: SideEmailProps) {
    return (
        <div className={cn("hover:scale-105 transition-all duration-200", className)}>
            <Link 
                href="mailto:dionyichia@gmail.com?subject=Hello from your website&body=Hey Dion,%0D%0A%0D%0AI found your website and wanted to reach out..."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex item-center hover:text-accent" >
                dionyichia@gmail.com
            </Link>
        </div>
    );
}