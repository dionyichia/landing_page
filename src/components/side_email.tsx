import { cn } from "@/lib/utils";

type SideEmailProps = {
    className?: string;
}

export default function SideEmail({className}: SideEmailProps) {
    return (
        <div className={cn("flex flex-col items-center", className)}>
            dionyichia@gmail.com
        </div>
    );
}