import { useState, useContext } from "react";
import { WeddingContext } from "@/context/WeddingContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function EditableText({
  value,
  onSave,
  className = "",
  multiline = false,
  placeholder = "Enter text...",
  children,
}: EditableTextProps) {
  const context = useContext(WeddingContext);
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState(value);

  if (!context) {
    throw new Error("EditableText must be used within WeddingProvider");
  }

  const { isLoggedIn } = context;

  const handleOpen = () => {
    if (!isLoggedIn) return;
    setEditValue(value);
    setIsOpen(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsOpen(false);
  };

  const editableStyles = isLoggedIn 
    ? "cursor-pointer bg-red-100 hover:bg-red-200 border-2 border-red-300 border-dashed relative group transition-colors duration-200" 
    : "";

  return (
    <>
      <div
        className={`${editableStyles} ${className}`}
        onClick={handleOpen}
        role={isLoggedIn ? "button" : undefined}
        tabIndex={isLoggedIn ? 0 : undefined}
      >
        {children || value}
        {isLoggedIn && (
          <Edit className="absolute top-1 right-1 h-4 w-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full"
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                className="w-full"
              />
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
