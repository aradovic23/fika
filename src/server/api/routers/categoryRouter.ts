import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  createCategory: publicProcedure
    .input(
      z.object({
        categoryName: z.string(),
        url: z.string().optional(),
        addTypes: z.boolean().optional(),
        addDescription: z.boolean().optional(),
        isDefault: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCategory = await ctx.prisma.category.create({
        data: {
          categoryName: input.categoryName,
          url: input.url,
          addTypes: input.addTypes,
          addDescription: input.addDescription,
          isDefault: input.isDefault,
        },
      });
      return newCategory;
    }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.prisma.category.findMany({
      orderBy: { categoryName: "asc" },
    });
    return category;
  }),
  updateCategory: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          categoryName: z.string().optional(),
          url: z.string().optional(),
          addTypes: z.boolean().optional(),
          addDescription: z.boolean().optional(),
          isDefault: z.boolean().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          categoryName: input.data.categoryName,
          url: input.data.url,
          addTypes: input.data.addTypes,
          addDescription: input.data.addDescription,
          isDefault: input.data.isDefault,
        },
      });
      return category;
    }),
  deleteCategory: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.category.delete({
          where: {
            id,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    }),
});
