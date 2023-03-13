import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const drinksRouter = createTRPCRouter({
  createDrink: publicProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.string(),
        tag: z.string().nullish(),
        categoryId: z.number().nullish(),
        volume: z.string().nullish(),
        type: z.string().nullish(),
        description: z.string().nullish(),
        image: z.string().nullish(),
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
          image: input.image,
          category: {
            connect: {
              id: input.categoryId ?? 1,
            },
          },
        },
      });
      return drink;
    }),

  getDrinks: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return drinks;
  }),

  getDrinkById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const singleDrink = await ctx.prisma.drink.findFirst({
        where: {
          id: input.id,
        },
      });
      if (singleDrink) return singleDrink;
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
          title: z.string(),
          price: z.string(),
          tag: z.string().nullish(),
          categoryId: z.number().nullish(),
          volume: z.string().nullish(),
          type: z.string().nullish(),
          description: z.string().nullish(),
          image: z.string().nullish(),
          isHidden: z.boolean(),
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
          updatedAt: new Date(),
          image: input.data.image,
          isHidden: input.data.isHidden,
        },
      });
      return drink;
    }),
});
