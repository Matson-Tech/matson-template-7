import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useWedding from "@/hooks/useWedding";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const { weddingData } = useWedding();

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % weddingData.gallery.length);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage(
                selectedImage === 0
                    ? weddingData.gallery.length - 1
                    : selectedImage - 1,
            );
        }
    };

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {weddingData.gallery.map((photo, index) => (
                            <div
                                key={photo.id}
                                className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={photo.url}
                                    alt={
                                        photo.caption ||
                                        `Gallery photo ${index + 1}`
                                    }
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="text-white text-center">
                                            <p className="text-sm font-medium">
                                                Click to view
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {photo.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <p className="text-white text-sm">
                                            {photo.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
                <DialogContent className="max-w-4xl max-h-screen p-0 bg-black/90 border-none">
                    {selectedImage !== null && (
                        <div className="relative w-full max-h-full flex items-center justify-center overflow-hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>

                            <img
                                src={weddingData.gallery[selectedImage].url}
                                alt={
                                    weddingData.gallery[selectedImage]
                                        .caption ||
                                    `Gallery photo ${selectedImage + 1}`
                                }
                                className="max-w-screen max-h-[calc(100vh-2rem)] object-contain"
                            />

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded px-3 py-1 text-sm">
                                {selectedImage + 1} /{" "}
                                {weddingData.gallery.length}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
