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
            <p
                className="text-muted-foreground mb-4 italic wrap-break-word"
                title={wish.message}
            >
                "{wish.message}"
            </p>
            <p className="text-rose-600 font-medium font-serif">
                — {wish.name}
            </p>
        </div>
    );
};
export default WishCard;
