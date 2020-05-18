import { useState } from "react";
import { editCategory, createCategory } from "../../api";
import { Category } from "../../util";
const useEditDialog = () => {
  const [editingName, setEditingName] = useState("");
  const [category, setCategory] = useState<Category>({} as any);
  const handleOpenEditDialog = (name: string, category: Category) => {
    setEditingName(name);
    setCategory(category);
  };
  const handleEditSubmit = async (
    newName: string,
    currentCategory?: Category
  ): Promise<string> => {
    let result: string = "";
    if (currentCategory && newName)
      result = await editCategory(newName, currentCategory);
    else if (newName) result = await createCategory(newName);
    return result;
  };
  return {
    editingName,
    setEditingName,
    category,
    handleOpenEditDialog,
    handleEditSubmit,
  };
};
export default useEditDialog;
