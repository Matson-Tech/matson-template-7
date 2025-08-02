import useWedding from "@/hooks/useWedding";
import { GalleryImage } from "@/types/wedding";
import deleteImage from "@/utils/deleteImage";
import messageOnUpdate, { useCase } from "@/utils/messageOnUpdate";

const useUpdateGallery = () => {
    const { weddingData, updateWeddingData, user } = useWedding();

    const handleDelete = async (name: string, indexToRemove: number) => {
        const updatedGallery = [...weddingData.gallery];
        updatedGallery.splice(indexToRemove, 1);

        const updated = await deleteImage(user, name);

        if (!updated) {
            return;
        }

        const isUpdated = await updateWeddingData({ gallery: updatedGallery });
        messageOnUpdate(isUpdated, "photo", useCase.Delete);
    };

    const getSlots = (limit: number): GalleryImage[] =>
        Array.from({ length: limit }, (_, index) => {
            return (
                weddingData.gallery[index] || {
                    id: `empty-${index}`,
                    url: "",
                    caption: null,
                    name: null,
                }
            );
        });
    return { handleDelete, getSlots };
};

export default useUpdateGallery;
