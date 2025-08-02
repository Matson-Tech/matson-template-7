import { useContext } from "react";
import EditableText from "@/components/editable/EditableText";
import { WeddingContext } from "@/context/WeddingContext";
import useWedding from "@/hooks/useWedding";
import useUpdateStory from "@/hooks/useUpdateStory";

const OurStorySection: React.FC = () => {
    const context = useContext(WeddingContext);

    if (!context) {
        throw new Error("OurStorySection must be used within WeddingProvider");
    }

    const { weddingData } = useWedding();
    const { updateStoryContent, updateStoryImage, updateStoryTitle } =
        useUpdateStory();

    return (
        <section id="story" className="py-20 bg-cream-50 z-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col-reverse md:flex-row w-full gap-12 justify-between">
                    <div className="flex flex-col justify-center">
                        <EditableText
                            value={weddingData.story.title}
                            onSave={updateStoryTitle}
                            label="Edit story title"
                            className="text-4xl font-serif text-foreground mb-12 lg:mb-6"
                        />
                        <EditableText
                            value={weddingData.story.content}
                            onSave={updateStoryContent}
                            label="Edit story content"
                            multiline
                            className="text-muted-foreground leading-relaxed max-w-md text-left"
                        />
                    </div>
                    <div className="relative grow max-w-lg">
                        <img
                            src={weddingData.story.image}
                            alt="Our Story"
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStorySection;
