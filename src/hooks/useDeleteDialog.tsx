import { useState } from "react";

const useDeleteDialog = <T,>(
  onDelete: (id: string) => Promise<void>,
  onFetch: () => void,
  onClose: () => void
) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const handleOpenDeleteDialog = (name: string, id: string) => {
    setName(name);
    setId(id);
  };
  const handleDeleteSubmit = (id: string) => {
    onDelete(id).then(() => {
      onFetch();
      onClose();
    });
  };
  return {
    name,
    id,
    handleOpenDeleteDialog,
    handleDeleteSubmit,
  };
};
export default useDeleteDialog;
