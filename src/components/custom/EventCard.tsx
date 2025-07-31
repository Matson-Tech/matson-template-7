import { Calendar, Clock, MapPin } from "lucide-react";
import useUpdateWeddingDetails from "@/hooks/useUpdateWeddingDetails";
import type { WeddingEvent } from "@/types/wedding";
import EditableText from "../editable/EditableText";
import { Card, CardContent } from "../ui/card";

interface EventCardProps {
    event: WeddingEvent;
    eventName: "event1" | "event2";
}

const EventCard: React.FC<EventCardProps> = ({ event, eventName }) => {
    const { updateEventDetails } = useUpdateWeddingDetails();
    return (
        <Card className="p-6">
            <CardContent className="space-y-4">
                <EditableText
                    value={event.title}
                    onSave={(value) =>
                        updateEventDetails(eventName, "title", value)
                    }
                    label="Edit title"
                    className="text-2xl font-serif text-rose-600 mb-4"
                    as="h3"
                />

                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <EditableText
                        value={event.date}
                        label={`Edit ${event.title} date`}
                        onSave={(value) =>
                            updateEventDetails(eventName, "date", value)
                        }
                        as="span"
                    />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <EditableText
                        value={event.time}
                        label={`Edit ${event.title} time`}
                        onSave={(value) =>
                            updateEventDetails(eventName, "time", value)
                        }
                        as="span"
                    />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <div>
                        <EditableText
                            value={event.venue}
                            label={`Edit ${event.title} venue`}
                            onSave={(value) =>
                                updateEventDetails(eventName, "venue", value)
                            }
                            as="div"
                        />
                        <EditableText
                            value={event.address}
                            label={`Edit ${event.title} address`}
                            onSave={(value) =>
                                updateEventDetails(eventName, "address", value)
                            }
                            as="div"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;
