import { cn } from "@/lib/utils";

interface HeadingProps {
    heading: string;
    subText?: string;
    className?: string;
}
const Heading: React.FC<HeadingProps> = ({ heading, subText, className }) => {
    return (
        <div className={cn("mb-16 text-center space-y-4", className)}>
            <h2 className="text-4xl font-serif text-foreground">{heading}</h2>
            {subText && (
                <p className="text-sm font-serif text-muted-foreground">
                    {subText}
                </p>
            )}
        </div>
    );
};

export default Heading;
