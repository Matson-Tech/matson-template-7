import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";
import WishCard from "../custom/WishCard";
import WishForm from "../custom/WishForm";

const GuestWishesSection: React.FC = () => {
    const { weddingWishes } = useWedding();

    return (
        <section id="wishes" className="py-20 bg-cream-50 z-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                    Guest Wishes
                </h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                    {/* Add Wish Form */}
                    <WishForm />
                    {/* Recent Wishes */}
                    <Card className="w-full max-w-md py-6 px-4 pb-0">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif font-medium text-center text-primary mb-4">
                                Recent Wishes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 mb-8 max-h-96 overflow-scroll scrollbar-none">
                                {weddingWishes.slice(0, 3).map((wish) => (
                                    <WishCard key={wish.id} wish={wish} />
                                ))}
                            </div>

                            <div className="text-center">
                                <Link to="/wishes">
                                    <Button variant="outline">
                                        View All Wishes
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default GuestWishesSection;
