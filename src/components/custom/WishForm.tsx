import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useWedding from "@/hooks/useWedding";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const WishForm: React.FC = () => {
    const [wishName, setWishName] = useState("");
    const [wishMessage, setWishMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addWish } = useWedding();

    const handleAddWish = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!wishName.trim() || !wishMessage.trim()) {
            toast.error("Please fill in both name and message");
            return;
        }

        const newWish = {
            id: `${Date.now()}-${crypto.randomUUID()}`,
            name: wishName.trim(),
            message: wishMessage.trim(),
        };

        setIsSubmitting(true);
        try {
            await addWish(newWish);
            toast.success("Thank you for your wishes!");
            setWishName("");
            setWishMessage("");
        } catch (error) {
            toast.error("Failed to submit wish. Please try again.");
            console.log("Error sending wish: ", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Card className="flex flex-col p-6 mb-12 w-full max-w-md m-0">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif font-medium text-center mb-4 text-primary">
                    Leave your wishes
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col grow">
                <form
                    onSubmit={handleAddWish}
                    className="flex flex-col grow space-y-3"
                >
                    <div className="flex flex-col flex-1 space-y-4">
                        <Input
                            placeholder="Your Name"
                            value={wishName}
                            onChange={(e) => setWishName(e.target.value)}
                        />
                        <div className="flex-1">
                            <Textarea
                                placeholder="Your message for the couple..."
                                value={wishMessage}
                                onChange={(e) => setWishMessage(e.target.value)}
                                rows={4}
                                className="h-full resize-none"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending Wish..." : "Send Your Wishes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default WishForm;
