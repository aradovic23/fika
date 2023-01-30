import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const drinksRouter = createTRPCRouter({
  createDrink: publicProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.string(),
        tag: z.string().nullish(),
        category: z.string().nullish(),
        volume: z.string().nullish(),
        type: z.string().nullish(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const drink = await ctx.prisma.drink.create({
        data: {
          ...input,
        },
      });
      return drink;
    }),
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
  getDrinks: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return drinks;
  }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.prisma.category.findMany({
      orderBy: [{ role: "asc" }, { categoryName: "asc" }],
    });
    return category;
  }),
  getDrinkById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const singleDrink = await ctx.prisma.drink.findUnique({
        where: {
          id: input.id,
        },
      });
      return singleDrink;
    }),
  deleteDrink: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.drink.delete({
          where: {
            id,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    }),
  getAllDrinks: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany();
    return drinks;
  }),
  updateDrink: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().optional(),
          price: z.string().optional(),
          tag: z.string().optional(),
          category: z.string().optional(),
          volume: z.string().optional(),
          type: z.string().optional(),
          description: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const drink = await ctx.prisma.drink.update({
        where: {
          id,
        },
        data,
      });
      return drink;
    }),
});
