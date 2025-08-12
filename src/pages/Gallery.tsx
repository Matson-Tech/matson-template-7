import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "@/components/custom/Heading";
import ImageCarousel from "@/components/custom/ImageCarousel";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import useSyncUsername from "@/hooks/useSyncUsername";
import useWedding from "@/hooks/useWedding";

export default function Gallery() {
    const { weddingData, isLoggedIn } = useWedding();
    const { username } = useParams();

    const limit = isLoggedIn
        ? import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 12
        : weddingData.gallery.length;

    useSyncUsername(username);
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation />

            <div className="flex-1 max-w-7xl mx-auto px-4 py-20">
                <Heading
                    heading="Wedding Gallery"
                    subText={`Capturing beautiful moments of ${weddingData.couple.groomName} & ${weddingData.couple.brideName}`}
                />

                {!isLoggedIn && weddingData.gallery.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-serif text-foreground mb-2">
                            No photos yet
                        </h3>
                        <p className="text-muted-foreground">
                            Photos will be added soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ImageCarousel limit={limit} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
