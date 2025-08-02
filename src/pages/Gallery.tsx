import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "@/components/custom/ImageCarousel";
import Navigation from "@/components/Navigation";
import useWedding from "@/hooks/useWedding";

export default function Gallery() {
    const { weddingData, isLoggedIn } = useWedding();

    const limit = isLoggedIn
        ? import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 12
        : weddingData.gallery.length;

    useEffect(() => window.scrollTo(0, 0));

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Wedding
                    </Link>

                    <h1 className="text-4xl font-serif text-foreground mb-4">
                        Wedding Gallery
                    </h1>
                    <p className="text-muted-foreground">
                        Capturing the beautiful moments of{" "}
                        {weddingData.couple.groomName} &{" "}
                        {weddingData.couple.brideName}
                    </p>
                </div>

                {weddingData.gallery.length === 0 ? (
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
        </div>
    );
}
