import { cn } from "@/lib/utils";

type SideEmailProps = {
    className?: string;
}

export default function SideEmail({className}: SideEmailProps) {
    return (
        <div className={cn("hover:scale-105 grayscale hover:grayscale-0 transition-all duration-200 dark:text-font", className)}>
            dionyichia@gmail.com
        </div>
    );
}