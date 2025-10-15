import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";

const JewellerSection: React.FC = () => {
    const { weddingAd } = useWedding();
    if (!weddingAd || !weddingAd.Ad_section) {
        return null;
    }
    // Provide default values if weddingAd is null/undefined
    const safeWeddingAd = {
        Ad_section: {
            title: weddingAd.Ad_section.title || 'Our wedding cards',
            image: weddingAd.Ad_section.image || '/jeweller/ad-1.jpg',
            description: weddingAd.Ad_section.description || 'Discover our exclusive collection of fine wedding cards.',
            shopName: weddingAd.Ad_section.shopName || 'Luxury Cards',
            website: weddingAd.Ad_section.website || 'matson.app',
            disabled: weddingAd.Ad_section.disabled || false
        }
    };
    if (safeWeddingAd.Ad_section.disabled) {
        return null;
    }

    return (
        <section id="jeweller" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <Card className="p-2 md:p-8 bg-linear-to-r from-rose-50 to-blush-50 border-rose-200">
                    <CardContent className="relative border-2 md:border-4 border-blush-400 p-0 rounded-2xl overflow-hidden shadow mb-5">
                        <img src={safeWeddingAd.Ad_section.image} alt="" />
                
                    </CardContent>
                    <CardContent className="text-center ">
                        <h2 className="relative text-4xl font-serif text-foreground mb-4">
                            {safeWeddingAd.Ad_section.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {safeWeddingAd.Ad_section.description}
                        </p>

                        <div className="mb-6">
                            <h3 className="text-2xl font-serif text-rose-600 mb-2">
                                {safeWeddingAd.Ad_section.shopName}
                            </h3>
                            <a
                                href={safeWeddingAd.Ad_section.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
                            >
                                Visit Our Store
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>

                        <Button size="lg" asChild>
                            <a
                                href={safeWeddingAd.Ad_section.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Shop Now
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default JewellerSection;
