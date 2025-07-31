import EditableText from "@/components/editable/EditableText";
import { Card, CardContent } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";

const AdditionalInfoSection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section id="info" className="py-20 bg-white z-20">
            <div className="max-w-4xl mx-auto px-4">
                <EditableText
                    value={weddingData.moreInfo.title}
                    onSave={(value) => {}}
                    label="Edit title"
                    className="text-4xl font-serif text-center text-foreground mb-16"
                >
                    <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                        {weddingData.moreInfo.title}
                    </h2>
                </EditableText>

                <Card className="p-8">
                    <CardContent>
                        <EditableText
                            value={weddingData.moreInfo.content}
                            onSave={(value) => {}}
                            label={`Edit ${weddingData.moreInfo.title} content`}
                            multiline
                            className="text-muted-foreground leading-relaxed text-center"
                        >
                            <p className="text-muted-foreground leading-relaxed text-center">
                                {weddingData.moreInfo.content}
                            </p>
                        </EditableText>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
export default AdditionalInfoSection;
