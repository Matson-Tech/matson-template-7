import EditableText from "@/components/editable/EditableText";
import { Card, CardContent } from "@/components/ui/card";
import useUpdateMoreInfo from "@/hooks/useUpdateMoreInfo";
import useWedding from "@/hooks/useWedding";

const AdditionalInfoSection: React.FC = () => {
   const { weddingData } = useWedding();
   const { updateContent, updateTitle } = useUpdateMoreInfo();

   if (weddingData.moreInfo.disabled) {
      return;
   }

   return (
      <section id="info" className="py-20 bg-white z-20">
         <div className="max-w-4xl mx-auto px-4">
            <EditableText
               value={weddingData.moreInfo.title}
               onSave={updateTitle}
               label="Edit title"
               className="text-4xl font-serif text-center text-foreground mb-16"
            >
               <h2 className="text-4xl font-serif text-center text-foreground mb-16">{weddingData.moreInfo.title}</h2>
            </EditableText>

            <Card className="p-8 pb-2">
               <CardContent>
                  <EditableText
                     value={weddingData.moreInfo.content}
                     onSave={updateContent}
                     label={`Edit ${weddingData.moreInfo.title} content`}
                     multiline
                     className="text-muted-foreground leading-relaxed text-center"
                     as="p"
                  />
               </CardContent>
            </Card>
         </div>
      </section>
   );
};
export default AdditionalInfoSection;
