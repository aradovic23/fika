import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const drinksRouter = createTRPCRouter({
  createDrink: publicProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.string(),
        tag: z.string().nullish(),
        categoryId: z.number().nullable(),
        volume: z.string().nullish(),
        type: z.string().nullish(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const drink = await ctx.prisma.drink.create({
        data: {
          title: input.title,
          price: input.price,
          tag: input.tag,
          volume: input.volume,
          type: input.type,
          description: input.description,
          category: {
            connect: {
              id: input.categoryId ?? 1,
            },
          },
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
          tag: z.string().nullable(),
          volume: z.string().nullable(),
          type: z.string().nullable(),
          description: z.string().nullable(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const drink = await ctx.prisma.drink.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.data.title,
          price: input.data.price,
          tag: input.data.tag,
          volume: input.data.volume,
          type: input.data.type,
          description: input.data.description,
        },
      });
      return drink;
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
});
