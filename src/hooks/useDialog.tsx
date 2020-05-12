import { useState } from "react";
const useDialog = <T, M>(
  deleteFn: (id: string) => Promise<void>,
  fetchFn: () => void
) => {
  const [openDialog, setOpenDialog] = useState<M | null>(null);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [element, setElement] = useState<T>({} as any);
  const handleOpenDialog = (
    type: M | null,
    name: string,
    id: string,
    element: T
  ) => {
    setName(name);
    setId(id);
    setElement(element);
    setOpenDialog(type);
  };
  const handleCloseDialog = () => {
    setOpenDialog(null);
    fetchFn();
  };
  const handleDeleteSubmit = (id: string) => {
    deleteFn(id).then(() => handleCloseDialog());
  };
  return {
    name,
    id,
    element,
    openDialog,
    setName,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteSubmit,
  };
};
export default useDialog;
