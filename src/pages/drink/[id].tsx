import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Toast } from "../../components/Toast";
import useToaster from "../../hooks/useToaster";
import { useGetCategory } from "../../hooks/useGetCategory";
import Button from "../../components/Button";
import { Textarea } from "../../components/Textarea";

const EditDrinkPage: NextPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    volume: "",
    type: "",
    description: "",
  });
  const [isVisible, message, showToaster, isDisabled] = useToaster();

  const router = useRouter();
  const { id } = router.query as {
    id: string;
  };
  const { data, isLoading, error } = api.drinks.getDrinkById.useQuery<{
    id: number;
    categoryId: number;
  }>(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );

  let categoryId: number | undefined;

  if (data && data.categoryId) {
    categoryId = data.categoryId as number;
  }

  const { category: productCategory } = useGetCategory(categoryId as number);

  const updateProduct = api.drinks.updateDrink.useMutation();

  const handleProductUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct.mutateAsync({
      id,
      data: {
        title: formData.title,
        price: formData.price,
        volume: formData.volume,
        type: formData.type,
        description: formData.description,
      },
    });

    showToaster(`${formData.title} updated`, { type: "back" });
  };

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        price: data.price,
        volume: data.volume ?? "",
        type: data.type ?? "",
        description: data.description ?? "",
      });
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Edit Drink | {formData.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <section className="container mx-auto py-10">
          <h1 className="my-2 text-center text-2xl font-bold">
            Edit product - {formData.title}
          </h1>
          {error && <p>error</p>}
          {isLoading && <p>Loading...</p>}
          <form onSubmit={handleProductUpdate} className="flex flex-col gap-3">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required={false}
              inputMode="text"
            />
            <Input
              label="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required={false}
              inputMode="numeric"
            />
            {data?.volume && (
              <Input
                inputMode="text"
                value={formData.volume}
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
                label="Volume"
                required={false}
              />
            )}

            {productCategory?.categoryName.toLowerCase() === "tea" && (
              <Input
                label="Type"
                inputMode="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required={false}
              />
            )}
            {productCategory?.categoryName.toLowerCase() === "cocktails" && (
              <Textarea
                placeholder="Add description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                label="Add cocktail description"
              ></Textarea>
            )}
            <Button disabled={isDisabled} backgroundColor="bg-primary">
              Update product
            </Button>
          </form>
          {isVisible && <Toast label={message} type="alert-success" />}
        </section>
      </main>
    </>
  );
};

export default EditDrinkPage;
