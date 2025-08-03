import { Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";
import Heading from "@/components/custom/Heading";
import Footer from "@/components/Footer";
import Loading from "@/components/custom/Loading";

export default function Wishes() {
    const { weddingWishes, loadAllWeddingWishes, globalIsLoading } =
        useWedding();

    useEffect(() => {
        loadAllWeddingWishes();
        window.scrollTo(0, 0);
    }, [loadAllWeddingWishes]);

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation />

            <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-20">
                <Heading
                    heading="All Wedding Wishes"
                    subText="Beautiful messages from our friends and family"
                />

                {weddingWishes.length === 0 ? (
                    <Card className="p-8 text-center">
                        <CardContent>
                            <Heart className="h-12 w-12 text-rose-300 mx-auto mb-4" />
                            <h3 className="text-xl font-serif text-foreground mb-2">
                                No wishes yet
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Be the first to send your warm wishes to the
                                couple!
                            </p>
                            <Link to="/#wishes">
                                <Button>Add Your Wishes</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {weddingWishes.map((wish) => (
                            <Card
                                key={wish.id}
                                className="p-6 hover:shadow-lg transition-shadow"
                            >
                                <CardContent>
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                                                <Heart className="h-6 w-6 text-rose-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-muted-foreground mb-4 italic text-lg leading-relaxed">
                                                "{wish.message}"
                                            </p>
                                            <p className="text-rose-600 font-medium">
                                                — {wish.name}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
