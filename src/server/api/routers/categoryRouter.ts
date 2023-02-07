import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  createCategory: publicProcedure
    .input(z.object({ categoryName: z.string(), url: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const newCategory = await ctx.prisma.category.create({
        data: {
          categoryName: input.categoryName,
          url: input.url,
        },
      });
      return newCategory;
    }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.prisma.category.findMany({
      orderBy: [{ role: "asc" }, { categoryName: "asc" }],
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
