import { Mail, MapPin, Phone } from "lucide-react";
import EditableText from "@/components/editable/EditableText";
import { Card, CardContent } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";

const ContactSection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    return (
        <section id="contact" className="py-20 bg-cream-50 z-20">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                    Contact Us
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="p-6 text-center">
                        <CardContent>
                            <Phone className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                            <h4 className="font-serif text-lg text-foreground mb-2">
                                Phone
                            </h4>
                            <EditableText
                                value={weddingData.contact.phone}
                                onSave={(value) => {}}
                                label="Edit phone number"
                                className="text-muted-foreground"
                            >
                                <p className="text-muted-foreground">
                                    {weddingData.contact.phone}
                                </p>
                            </EditableText>
                        </CardContent>
                    </Card>

                    <Card className="p-6 text-center">
                        <CardContent>
                            <Mail className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                            <h4 className="font-serif text-lg text-foreground mb-2">
                                Email
                            </h4>
                            <EditableText
                                value={weddingData.contact.email}
                                onSave={(value) => {}}
                                label="Edit email address"
                                className="text-muted-foreground"
                            >
                                <p className="text-muted-foreground">
                                    {weddingData.contact.email}
                                </p>
                            </EditableText>
                        </CardContent>
                    </Card>

                    <Card className="p-6 text-center">
                        <CardContent>
                            <MapPin className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                            <h4 className="font-serif text-lg text-foreground mb-2">
                                Address
                            </h4>
                            <EditableText
                                value={weddingData.contact.address}
                                onSave={(value) => {}}
                                label="Edit address"
                                multiline
                                className="text-muted-foreground"
                            >
                                <p className="text-muted-foreground">
                                    {weddingData.contact.address}
                                </p>
                            </EditableText>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;
