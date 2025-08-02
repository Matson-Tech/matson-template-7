import useWedding from "@/hooks/useWedding";
import EventCard from "../custom/EventCard";
import Heading from "../custom/Heading";
import ToKnowCard from "../custom/ToKnowCard";

const WeddingDetailsSection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section id="details" className="py-20 bg-white z-20">
            <div className="max-w-6xl mx-auto px-4">
                <Heading
                    heading="Wedding Details"
                    subText="Join us for these special moments"
                />

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
