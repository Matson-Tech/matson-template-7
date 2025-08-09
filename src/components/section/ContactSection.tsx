import { Mail, MapPin, Phone } from "lucide-react";
import EditableText from "@/components/editable/EditableText";
import useUpdateContacts from "@/hooks/useUpdateContacts";
import useWedding from "@/hooks/useWedding";
import ContactCard from "../custom/ContactCard";
import Heading from "../custom/Heading";
import EditableLink from "../editable/EditableLink";

const ContactSection: React.FC = () => {
   const { weddingData, isLoggedIn } = useWedding();
   const { updateContact, updateContactAddress } = useUpdateContacts();

   if (weddingData.contact.disabled) {
      return;
   }

   return (
      <section id="contact" className="py-20 bg-cream-50 z-20">
         <div className="max-w-4xl mx-auto px-4">
            <Heading heading="Contact Us" subText="Get in touch for any queries" />

            <div className="grid md:grid-cols-3 gap-8">
               <ContactCard title="Phone" link={`tel:${weddingData.contact.phone}`} Icon={Phone}>
                  <EditableText
                     value={weddingData.contact.phone}
                     onSave={(value) => updateContact("phone", value)}
                     label="Edit phone number"
                     className={
                        !isLoggedIn &&
                        "link group-hover:link-underline group-focus-visible:link-underline focus-visible:link-underline"
                     }
                     as="p"
                     tabIndex={0}
                  />
               </ContactCard>
               <ContactCard title="Email" link={`mailto:${weddingData.contact.email}`} Icon={Mail}>
                  <EditableText
                     value={weddingData.contact.email}
                     onSave={(value) => updateContact("email", value)}
                     label="Edit email address"
                     className={
                        !isLoggedIn &&
                        "link group-hover:link-underline group-focus-visible:link-underline focus-visible:link-underline"
                     }
                     tabIndex={0}
                     as="p"
                  />
               </ContactCard>

               <ContactCard
                  title="Address"
                  link={weddingData.contact.addressMapLink}
                  Icon={MapPin}
                  className="text-center"
               >
                  <EditableLink
                     text={weddingData.contact.address}
                     link={weddingData.contact.addressMapLink}
                     onSave={updateContactAddress}
                     label="Edit address"
                     className="text-base"
                  />
               </ContactCard>
            </div>
         </div>
      </section>
   );
};
export default ContactSection;
