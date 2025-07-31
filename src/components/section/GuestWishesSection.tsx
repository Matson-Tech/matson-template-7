import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { WeddingContext } from "@/context/WeddingContext";
import type { WeddingWish } from "@/types/wedding";

const GuestWishesSection: React.FC = () => {
    const context = useContext(WeddingContext);
    const [wishName, setWishName] = useState("");
    const [wishMessage, setWishMessage] = useState("");

    if (!context) {
        throw new Error(
            "GuestWishesSection must be used within WeddingProvider",
        );
    }

    const { weddingWishes, addWish } = context;

    const handleAddWish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wishName.trim() || !wishMessage.trim()) return;

        const newWish: WeddingWish = {
            id: Date.now().toString(),
            name: wishName,
            message: wishMessage,
        };

        await addWish(newWish);
        setWishName("");
        setWishMessage("");
    };

    return (
        <section id="wishes" className="py-20 bg-cream-50 z-20">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                    Guest Wishes
                </h2>

                {/* Add Wish Form */}
                <Card className="p-6 mb-12">
                    <CardContent>
                        <form onSubmit={handleAddWish} className="space-y-4">
                            <Input
                                placeholder="Your Name"
                                value={wishName}
                                onChange={(e) => setWishName(e.target.value)}
                                required
                            />
                            <Textarea
                                placeholder="Your message for the couple..."
                                value={wishMessage}
                                onChange={(e) => setWishMessage(e.target.value)}
                                rows={3}
                                required
                            />
                            <Button type="submit" className="w-full">
                                <Heart className="h-4 w-4 mr-2" />
                                Send Your Wishes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Recent Wishes */}
                <div className="space-y-6 mb-8">
                    {weddingWishes.slice(0, 3).map((wish) => (
                        <Card key={wish.id} className="p-6">
                            <CardContent>
                                <p className="text-muted-foreground mb-4 italic">
                                    "{wish.message}"
                                </p>
                                <p className="text-rose-600 font-medium">
                                    — {wish.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/wishes">
                        <Button variant="outline">View All Wishes</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GuestWishesSection;
