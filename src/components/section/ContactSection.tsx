import { Mail, MapPin, Phone } from "lucide-react";
import EditableText from "@/components/editable/EditableText";
import useUpdateContacts from "@/hooks/useUpdateContacts";
import useWedding from "@/hooks/useWedding";
import ContactCard from "../custom/ContactCard";

const ContactSection: React.FC = () => {
    const { weddingData } = useWedding();
    const { updateContact } = useUpdateContacts();

    return (
        <section id="contact" className="py-20 bg-cream-50 z-20">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-center text-foreground mb-16">
                    Contact Us
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <ContactCard
                        title="Phone"
                        link={`tel:${weddingData.contact.phone}`}
                        Icon={Phone}
                    >
                        <EditableText
                            value={weddingData.contact.phone}
                            onSave={(value) => updateContact("phone", value)}
                            label="Edit phone number"
                            className="text-muted-foreground"
                            as="p"
                        />
                    </ContactCard>
                    <ContactCard
                        title="Email"
                        link={`mailto:${weddingData.contact.email}`}
                        Icon={Mail}
                    >
                        <EditableText
                            value={weddingData.contact.email}
                            onSave={(value) => updateContact("email", value)}
                            label="Edit email address"
                            className="text-muted-foreground"
                        />
                    </ContactCard>

                    <ContactCard
                        title="Address"
                        link={weddingData.contact.addressMapLink}
                        Icon={MapPin}
                    >
                        <EditableText
                            value={weddingData.contact.address}
                            onSave={(value) => {}}
                            label="Edit address"
                            multiline
                            className="text-muted-foreground"
                        />
                    </ContactCard>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;
