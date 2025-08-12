import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";
import Heading from "../custom/Heading";
import WishCard from "../custom/WishCard";
import WishForm from "../custom/WishForm";

const GuestWishesSection: React.FC = () => {
    const { weddingData, weddingWishes, user } = useWedding();

    if (weddingData.wishDisabled) {
        return;
    }

    return (
        <section id="wishes" className="py-20 bg-cream-50 z-20">
            <div className="max-w-6xl mx-auto px-4">
                <Heading
                    heading="Guest Wishes"
                    subText="Messages wrapped in love"
                />

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch w-full">
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
                                <Link to={`/wishes/${user?.username}`}>
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
