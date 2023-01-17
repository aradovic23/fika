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
  getDrinks: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany();
    return drinks;
  }),
});
