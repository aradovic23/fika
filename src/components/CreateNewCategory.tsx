import { useState } from "react";
import { api } from "../utils/api";
import { Input } from "./Input";
import ImageSearch from "./ImageSearch";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  handleIsActive: (state: boolean) => void;
}

const CreateNewCategory = ({ handleIsActive }: Props) => {
  const createCategoryMutation = api.categories.createCategory.useMutation();
  const { refetch } = api.categories.getCategories.useQuery();

  const [newCategory, setNewCategory] = useState({ name: "", url: "" });

  const handleCreateNewCategory = async (e: React.FormEvent) => {
    if (newCategory.name === "") return;
    e.preventDefault();
    try {
      await createCategoryMutation.mutateAsync({
        categoryName: newCategory.name,
        url: newCategory.url,
      });
      setNewCategory({ name: "", url: "" });
      toast.success(`${newCategory.name} added`);
      handleIsActive(false);
      await refetch();
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  const handleSelectedImage = (image: string) => {
    setNewCategory((prevState) => ({
      ...prevState,
      url: image,
    }));
  };

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg bg-base-300/70 p-5">
      <Input
        required
        value={newCategory.name}
        inputMode="text"
        onChange={(e) =>
          setNewCategory((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
        placeholder="Enter category name"
      />
      <ImageSearch handleSelectedImage={handleSelectedImage} />
      <Input
        label="Image Url (Optional)"
        value={newCategory.url}
        inputMode="text"
        onChange={(e) =>
          setNewCategory((prevState) => ({
            ...prevState,
            url: e.target.value,
          }))
        }
        placeholder="Paste image url"
        hidden
      />

      {newCategory?.url && (
        <div className="relative h-52">
          <Image
            src={newCategory.url}
            fill
            alt="no img"
            className="rounded object-cover"
            sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
            priority
            placeholder="empty"
          />
        </div>
      )}

      <button
        onClick={handleCreateNewCategory}
        className="btn-outline btn-secondary btn mt-2"
      >
        Create new category
      </button>
    </div>
  );
};

export default CreateNewCategory;
