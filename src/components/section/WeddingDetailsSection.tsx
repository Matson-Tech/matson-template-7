import { useContext } from "react";
import { WeddingContext } from "@/context/WeddingContext";
import EventCard from "../custom/EventCard";
import ToKnowCard from "../custom/ToKnowCard";

const WeddingDetailsSection: React.FC = () => {
    const context = useContext(WeddingContext);

    if (!context) {
        throw new Error(
            "WeddingDetailsSection must be used within WeddingProvider",
        );
    }

    const { weddingData } = context;

    return (
        <section id="details" className="py-20 bg-white z-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                    Wedding Details
                </h2>

                {/* Events */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <EventCard
                        event={weddingData.weddingDetails.event1}
                        eventName="event1"
                    />
                    <EventCard
                        event={weddingData.weddingDetails.event2}
                        eventName="event2"
                    />
                </div>

                {/* Things to Know */}
                <div className="grid md:grid-cols-3 gap-6">
                    <ToKnowCard
                        toKnow={weddingData.weddingDetails.toKnow1}
                        toKnowName="toKnow1"
                    />
                    <ToKnowCard
                        toKnow={weddingData.weddingDetails.toKnow2}
                        toKnowName="toKnow2"
                    />
                    <ToKnowCard
                        toKnow={weddingData.weddingDetails.toKnow3}
                        toKnowName="toKnow3"
                    />
                </div>
            </div>
        </section>
    );
};

export default WeddingDetailsSection;
