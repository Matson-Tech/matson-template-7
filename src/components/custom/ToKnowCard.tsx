import useUpdateWeddingDetails from "@/hooks/useUpdateWeddingDetails";
import type { WeddingToKnow } from "@/types/wedding";
import EditableText from "../editable/EditableText";
import { Card, CardContent } from "../ui/card";

interface ToKnowCardProps {
    toKnowName: "toKnow1" | "toKnow2" | "toKnow3";
    toKnow: WeddingToKnow;
}

const ToKnowCard: React.FC<ToKnowCardProps> = ({ toKnowName, toKnow }) => {
    const { updateEventDetails } = useUpdateWeddingDetails();
    return (
        <Card className="py-4 px-6">
            <CardContent className="p-0">
                <EditableText
                    value={toKnow.title}
                    onSave={(value) =>
                        updateEventDetails(toKnowName, "title", value)
                    }
                    label="Edit title"
                    as="h4"
                    className="font-serif text-lg text-rose-600 mb-3"
                />

                <EditableText
                    value={toKnow.description}
                    onSave={(value) =>
                        updateEventDetails(toKnowName, "description", value)
                    }
                    label={`Edit ${toKnow.title} description`}
                    as="p"
                    multiline
                    className="text-muted-foreground text-sm"
                />
            </CardContent>
        </Card>
    );
};

export default ToKnowCard;
