import { Heart, Sparkles } from "lucide-react";
import EditableText from "@/components/editable/EditableText";
import useUpdateCouple from "@/hooks/useUpdateCouple";
import useWedding from "@/hooks/useWedding";

const HeroSection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();
    const {
        updateWeddingQuote,
        updateBrideName,
        updateGroomName,
        updateCoupleImage,
    } = useUpdateCouple();

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden z-20"
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={weddingData.couple.image}
                    alt="Couple"
                    className="w-full h-full object-cover absolute inset-0 z-0"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 z-10"></div>

                {/* Subtle sparkles */}
                <div className="absolute inset-0 select-none pointer-events-none z-20">
                    <div className="absolute top-1/4 left-1/4 text-amber-400/80 pulse-gentle">
                        <Sparkles className="animate-float-slow" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/3 text-amber-400/80 pulse-gentle">
                        <Sparkles className="animate-float-slow" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <EditableText
                    value={weddingData.couple.weddingQuote}
                    onSave={updateWeddingQuote}
                    label="Update wedding quote"
                    className="text-lg md:text-3xl mb-8 max-w-3xl mx-auto font-serif italic"
                />

                <div className="space-y-4">
                    <EditableText
                        value={weddingData.couple.groomName}
                        label="Update groom name"
                        onSave={updateGroomName}
                        className="font-script text-6xl md:text-8xl text-rose-300 mb-2"
                    />

                    <div className="relative text-4xl md:text-6xl font-light flex justify-center">
                        <Heart className="absolute mx-auto w-10 h-10 text-rose-500/80 blur-xs" />
                        <Heart className="mx-auto w-10 h-10 text-rose-400" />
                    </div>

                    <EditableText
                        value={weddingData.couple.brideName}
                        label="Update bride name"
                        onSave={updateBrideName}
                        className="font-script text-6xl md:text-8xl text-rose-300 mb-2"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
