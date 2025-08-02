import { HeartIcon } from "lucide-react";
import useWedding from "@/hooks/useWedding";

const Footer = () => {
    const { weddingData } = useWedding();
    return (
        <footer className="relative py-8 text-center bg-card border-t-1 border-rose-200 w-full">
            <div className="container text-primary mx-auto px-4 space-y-4">
                <div className="inline-flex items-center space-x-1 font-serif text-xl">
                    <p>{weddingData.couple.groomName}</p>
                    <HeartIcon size={20} />
                    <p>{weddingData.couple.brideName}</p>
                </div>
                <p className="text-sm font-serif mb-5">
                    Thank you for being a part of our wedding.
                </p>
                <p className="text-xs font-sans text-muted-foreground">
                    © {new Date().getFullYear()} Matson Wedding Websites
                </p>
            </div>
        </footer>
    );
};

export default Footer;
