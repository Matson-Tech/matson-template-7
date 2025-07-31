import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useContext } from "react";
import { WeddingContext } from "@/context/WeddingContext";

const JewellerSection: React.FC = () => {
    const context = useContext(WeddingContext);

    if (!context) {
        throw new Error("JewellerSection must be used within WeddingProvider");
    }

    const { weddingData } = context;

    return (
        <section id="jeweller" className="py-20 bg-white z-20">
            <div className="max-w-4xl mx-auto px-4">
                <Card className="p-8 bg-gradient-to-r from-rose-50 to-blush-50 border-rose-200">
                    <CardContent className="text-center">
                        <h2 className="text-4xl font-serif text-foreground mb-4">
                            {weddingData.jeweller.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {weddingData.jeweller.description}
                        </p>

                        <div className="mb-6">
                            <h3 className="text-2xl font-serif text-rose-600 mb-2">
                                {weddingData.jeweller.shopName}
                            </h3>
                            <a
                                href={weddingData.jeweller.website}
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
                                href={weddingData.jeweller.website}
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
