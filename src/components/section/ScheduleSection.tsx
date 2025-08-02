import { Plus, Trash2 } from "lucide-react";
import EditableText from "@/components/editable/EditableText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useUpdateSchedule from "@/hooks/useUpdateSchedule";
import useWedding from "@/hooks/useWedding";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Heading from "../custom/Heading";

const ScheduleSection: React.FC = () => {
    const { weddingData, isLoggedIn } = useWedding();
    const {
        updateScheduleItem,
        addScheduleItem,
        removeScheduleItem,
        setIsAddingItem,
        isAddingItem,
        newItem,
        setNewItem,
    } = useUpdateSchedule();

    return (
        <section id="schedule" className="py-20 bg-cream-50 z-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col gap-8 md:flex-row md:gap-0 justify-end items-center mb-16">
                    <div className="w-full text-center">
                        <Heading
                            heading="Wedding Schedule"
                            subText=" Timeline of our special day"
                            className="mb-0"
                        />
                    </div>
                    {isLoggedIn && (
                        <Button
                            onClick={() => setIsAddingItem(true)}
                            size="sm"
                            className="md:absolute flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Event
                        </Button>
                    )}
                </div>
                <div className="space-y-6">
                    {weddingData.schedule.map((item) => (
                        <Card key={item.id} className="p-2 pt-8">
                            <CardContent className="flex items-center justify-between space-x-4">
                                <div className="flex items-center">
                                    <EditableText
                                        value={item.time}
                                        onSave={(value) =>
                                            updateScheduleItem(
                                                item.id,
                                                "time",
                                                value,
                                            )
                                        }
                                        label={`Edit ${item.event} time`}
                                        className="text-lg font-semibold text-rose-600 min-w-[100px]"
                                        as="div"
                                    />

                                    <div className="space-y-1">
                                        <EditableText
                                            value={item.event}
                                            onSave={(value) =>
                                                updateScheduleItem(
                                                    item.id,
                                                    "event",
                                                    value,
                                                )
                                            }
                                            label="Edit event title"
                                            as="h4"
                                            className="text-lg font-serif text-foreground"
                                        />

                                        <EditableText
                                            value={item.description}
                                            onSave={(value) =>
                                                updateScheduleItem(
                                                    item.id,
                                                    "description",
                                                    value,
                                                )
                                            }
                                            label={`Edit ${item.event} description`}
                                            className="text-muted-foreground text-sm md:text-base"
                                            as="p"
                                        />
                                    </div>
                                </div>

                                {isLoggedIn && (
                                    <Button
                                        onClick={() =>
                                            removeScheduleItem(item.id)
                                        }
                                        size="sm"
                                        variant="destructive"
                                        className="flex items-center"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Schedule Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="time_input"
                                className="text-sm font-medium mb-2 block"
                            >
                                Time
                            </label>
                            <Input
                                id="time_input"
                                value={newItem.time}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        time: e.target.value,
                                    })
                                }
                                placeholder="e.g., 4:00 PM"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="event_input"
                                className="text-sm font-medium mb-2 block"
                            >
                                Event
                            </label>
                            <Input
                                id="event_input"
                                value={newItem.event}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        event: e.target.value,
                                    })
                                }
                                placeholder="e.g., Ceremony"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description_textarea"
                                className="text-sm font-medium mb-2 block"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description_textarea"
                                value={newItem.description}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Brief description..."
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddingItem(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={addScheduleItem}
                            disabled={!newItem.time || !newItem.event}
                        >
                            Add Item
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ScheduleSection;
