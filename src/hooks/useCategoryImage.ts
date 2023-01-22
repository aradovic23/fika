// import { api } from "./../utils/api";
export const useCategoryImage = (categoryName: string) => {
  // const categories = api.drinks.getCategories.useQuery();
  //  TODO: PUT IMG URLS WHEN CREATING CATEGORIES
  const imageMap = [
    {
      name: "coffee",
      url: "https://images.unsplash.com/photo-1610492273280-c60d0be4f0d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "alcoholic",
      url: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "non-alcoholic",
      url: "https://images.unsplash.com/photo-1574603570434-a4be4e10390c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "beer",
      url: "https://images.unsplash.com/photo-1615332579037-3c44b3660b53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "wine",
      url: "https://images.unsplash.com/photo-1616240580835-85fec1c8188b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1151&q=80",
    },
    {
      name: "tea",
      url: "https://images.unsplash.com/photo-1609016617751-e80552ae6ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    },
    {
      name: "juices",
      url: "https://images.unsplash.com/photo-1494091419109-066f43fc6822?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "brandy",
      url: "https://images.unsplash.com/photo-1606673378980-3a1b09f9aa93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",
    },
    {
      name: "shakes",
      url: "https://images.unsplash.com/photo-1596108005029-8b6b02720dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "cocktails",
      url: "https://images.unsplash.com/photo-1563223771-c2142d276459?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const categoryImage = imageMap.find(
    (image) => categoryName.toLowerCase() === image.name.toLowerCase()
  );

  return categoryImage?.url;
};
