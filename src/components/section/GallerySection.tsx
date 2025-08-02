import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Heading from "../custom/Heading";
import ImageCarousel from "../custom/ImageCarousel";

const GallerySection: React.FC = () => {
    return (
        <section id="gallery" className="py-20 bg-white z-20">
            <div className="max-w-6xl mx-auto px-4">
                <Heading heading="Gallery" subText="Love in frames" />

                <div
                    key="gallery-images"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <ImageCarousel limit={3} />
                </div>
                <div className="text-center mt-10">
                    <Link to="/gallery">
                        <Button variant="outline">View All Photos</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
