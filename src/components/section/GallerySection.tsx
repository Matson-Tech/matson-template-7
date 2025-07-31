import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WeddingContext } from "@/context/WeddingContext";

const GallerySection: React.FC = () => {
    const context = useContext(WeddingContext);

    if (!context) {
        throw new Error("GallerySection must be used within WeddingProvider");
    }

    const { weddingData } = context;

    return (
        <section id="gallery" className="py-20 bg-white z-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-4xl font-serif text-foreground">
                        Gallery
                    </h2>
                    <Link to="/gallery">
                        <Button variant="outline">View All Photos</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weddingData.gallery.slice(0, 6).map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group overflow-hidden rounded-lg shadow-lg"
                        >
                            <img
                                src={photo.url}
                                alt={photo.caption || "Gallery photo"}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {photo.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                                    <p className="text-sm">{photo.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
