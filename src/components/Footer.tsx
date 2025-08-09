import { Heart } from "lucide-react";
import useWedding from "@/hooks/useWedding";

const Footer = () => {
    const { weddingData } = useWedding();
    return (
        <footer className="relative py-8 text-center w-full border-2 border-rose-300/10 bg-gradient-to-r from-card/40 to-white/10 bg-clip-padding backdrop-blur-md">
            <div className="container text-primary mx-auto px-4 space-y-4">
                <div className="inline-flex items-center justify-center space-x-1 font-serif text-xl">
                    <Heart size={20} className="mr-2" />
                    <p>{weddingData.couple.groomName}</p>
                    <p>&</p>
                    <p>{weddingData.couple.brideName}</p>
                    <Heart size={20} className="ml-1" />
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
