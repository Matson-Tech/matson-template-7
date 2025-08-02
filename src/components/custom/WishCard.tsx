import type { WeddingWish } from "@/types/wedding";

interface WishCardProps {
    wish: WeddingWish;
}
const WishCard: React.FC<WishCardProps> = ({ wish }) => {
    return (
        <div
            key={wish.id}
            className="p-4 bg-card/20 rounded-xl text-card-foreground border border-rose-300/20"
        >
            <div className="overflow-hidden max-h-screen">
                <p
                    className="text-muted-foreground mb-4 italic"
                    title={wish.message}
                >
                    "{wish.message}"
                </p>
                <p className="text-rose-600 font-medium font-serif">
                    — {wish.name}
                </p>
            </div>
        </div>
    );
};
export default WishCard;
