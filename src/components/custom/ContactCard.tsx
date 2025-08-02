import useWedding from "@/hooks/useWedding";
import { Card, CardContent } from "../ui/card";

interface ContactCardProps {
    title: string;
    link: string;
    Icon: React.ElementType;
    children?: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({
    title,
    link,
    Icon,
    children,
}) => {
    const { isLoggedIn } = useWedding();

    const openLinkInNewTab = () => {
        if (!isLoggedIn && link) {
            window.open(link, "_blank", "noopener noreferrer");
        }
    };

    return (
        <Card
            className="flex items-center justify-center p-0"
            onClick={openLinkInNewTab}
        >
            <CardContent>
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
