import useWedding from "@/hooks/useWedding";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface ContactCardProps {
    title: string;
    link: string;
    Icon: React.ElementType;
    children?: React.ReactNode;
    className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
    title,
    link,
    Icon,
    children,
    className,
}) => {
    const { isLoggedIn } = useWedding();

    const openLinkInNewTab = () => {
        if (!isLoggedIn && link) {
            window.open(link, "_blank", "noopener noreferrer");
        }
    };

    return (
        <Card
            className={cn(
                "flex items-center justify-center py-5 px-3 cursor-pointer group",
                className,
            )}
            onClick={openLinkInNewTab}
            tabIndex={0}
        >
            <CardContent className="p-0">
                <Icon className="h-8 w-8 text-rose-600 mx-auto mb-4 p-0" />
                <h4 className="font-serif text-lg text-foreground mb-2 text-center">
                    {title}
                </h4>
                {children}
            </CardContent>
        </Card>
    );
};

export default ContactCard;
