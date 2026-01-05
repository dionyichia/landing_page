import { cn } from "@/lib/utils";
import Link from "next/link";

type SideEmailProps = {
    className?: string;
}

export default function SideEmail({className}: SideEmailProps) {
    return (
        <div className={cn("hover:scale-105 grayscale hover:grayscale-0 transition-all duration-200 dark:text-font", className)}>
            <Link 
                href="mailto:dionyichia@gmail.com?subject=Hello from your website&body=Hey Dion,%0D%0A%0D%0AI found your website and wanted to reach out..."
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70 flex item-center" >
                dionyichia@gmail.com
            </Link>
        </div>
    );
}