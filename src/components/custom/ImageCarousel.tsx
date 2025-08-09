import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useUpdateGallery from "@/hooks/useUpdateGallery";
import useWedding from "@/hooks/useWedding";
import onEnterKeyDown from "@/utils/onEnterKeyDown";
import EditableImage from "../editable/EditableImage";
import DeletableItem from "../editable/DeletableItem";

interface ImageCarouselProps {
   limit: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ limit }) => {
   const { weddingData, updateGalleryImage, isLoggedIn } = useWedding();
   const { getSlots, handleDelete } = useUpdateGallery();

   const [selectedImage, setSelectedImage] = useState<number | null>(null);

   const slots = getSlots(limit);

   const openLightbox = (index: number) => {
      setSelectedImage(index);
   };

   const closeLightbox = () => {
      setSelectedImage(null);
   };

   const nextImage = () => {
      if (selectedImage !== null) {
         setSelectedImage((selectedImage + 1) % weddingData.gallery.length);
      }
   };

   const prevImage = () => {
      if (selectedImage !== null) {
         setSelectedImage(selectedImage === 0 ? slots.length - 1 : selectedImage - 1);
      }
   };

   return (
      <>
         {slots.map((photo, index) => (
            <DeletableItem
               key={photo.id}
               onDelete={() => handleDelete(photo.name, index)}
               label={`Delete gallery image ${index + 1}`}
               disabled={photo.name === null}
            >
               <EditableImage
                  onUpdate={updateGalleryImage}
                  index={index}
                  label={`Edit galler image ${index + 1}`}
                  className="rounded-lg"
                  imageCaption={photo.caption}
                  ImageCaptionAvailable
                  imageName={photo.name}
               >
                  <div className="relative" key={photo.id}>
                     {photo.name ? (
                        <div
                           key={`image-${photo.id}`}
                           className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                           onClick={() => openLightbox(index)}
                           onKeyDown={(e) => onEnterKeyDown(e, () => openLightbox(index))}
                           tabIndex={0}
                           role="button"
                        >
                           <img
                              src={photo.url}
                              alt={photo.caption || `Gallery photo ${index + 1}`}
                              className="w-full h-64 object-cover"
                           />
                           {!isLoggedIn && (
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-white text-center">
                                       <p className="text-sm font-medium">Click to view</p>
                                    </div>
                                 </div>
                              </div>
                           )}
                           {photo.caption && (
                              <div
                                 key={`caption-${photo.id}`}
                                 className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4"
                              >
                                 <p className="text-white text-sm">{photo.caption}</p>
                              </div>
                           )}
                        </div>
                     ) : (
                        <div
                           key={`empty-${photo.id}`}
                           className="relative flex flex-col justify-center items-center bg-gray-600/20 w-full h-64"
                        ></div>
                     )}
                  </div>
               </EditableImage>
            </DeletableItem>
         ))}
         {/* Lightbox */}
         <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
            <DialogContent className="max-w-4xl max-h-screen p-0 bg-black/90 border-none">
               {selectedImage !== null && (
                  <div
                     key="imagePreview"
                     className="relative w-full max-h-full flex items-center justify-center overflow-hidden"
                  >
                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                        onClick={prevImage}
                     >
                        <ChevronLeft className="h-8 w-8" />
                     </Button>

                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                        onClick={nextImage}
                     >
                        <ChevronRight className="h-8 w-8" />
                     </Button>

                     <img
                        src={weddingData.gallery[selectedImage].url}
                        alt={weddingData.gallery[selectedImage].caption || `Gallery photo ${selectedImage + 1}`}
                        className="max-w-screen max-h-[calc(100vh-2rem)] object-contain"
                     />

                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded px-3 py-1 text-sm">
                        {selectedImage + 1} / {slots.length}
                     </div>
                  </div>
               )}
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ImageCarousel;
