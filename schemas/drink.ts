import { defineField, defineType } from "sanity";

export default defineType({
  name: "drink",
  title: "Drink",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Tea Info",
      name: "teaType",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "grid",
        list: [
          { title: "Green", value: "green" },
          { title: "Herb", value: "herb" },
          { title: "Fruit", value: "fruit" },
          { title: "Black", value: "black" },
          { title: "Bag", value: "bag" },
          { title: "Rinfuse", value: "rinfuse" },
          { title: "Pyramid", value: "pyramid" },
        ],
      },
    }),
    defineField({
      title: "Volume",
      name: "volume",
      type: "string",
      options: {
        list: [
          { title: "0.01", value: "0.01" },
          { title: "0.02", value: "0.02" },
          { title: "0.03", value: "0.03" },
          { title: "0.05", value: "0.05" },
          { title: "0.10", value: "0.10" },
          { title: "0.15", value: "0.15" },
          { title: "0.20", value: "0.20" },
          { title: "0.25", value: "0.25" },
          { title: "0.27", value: "0.27" },
          { title: "0.30", value: "0.30" },
          { title: "0.33", value: "0.33" },
          { title: "0.35", value: "0.35" },
          { title: "0.40", value: "0.40" },
          { title: "0.50", value: "0.50" },
          { title: "0.70", value: "0.70" },
        ],
      },
    }),
    defineField({
      title: "Tag",
      name: "tag",
      type: "string",
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "productImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
