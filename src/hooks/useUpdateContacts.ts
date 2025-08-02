import useWedding from "@/hooks/useWedding";
import messageOnUpdate from "@/utils/messageOnUpdate";

const useUpdateContacts = () => {
    const { updateWeddingData, weddingData } = useWedding();

    const updateContact = async (
        field: "phone" | "email" | "address",
        value: string,
    ) => {
        const isUpdated = await updateWeddingData({
            contact: { ...weddingData.contact, [field]: value },
        });
        messageOnUpdate(isUpdated, field);
    };
    const updateContactAddress = async (text: string, link: string) => {
        const isUpdated = await updateWeddingData({
            contact: {
                ...weddingData.contact,
                address: text,
                addressMapLink: link,
            },
        });
        messageOnUpdate(isUpdated, "address");
    };
    return { updateContact, updateContactAddress };
};

export default useUpdateContacts;
