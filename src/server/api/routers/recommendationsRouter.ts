import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const recommendationsRouter = createTRPCRouter({
  getRecommendedProductsWithDetails: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.prisma.drink.findMany({
      where: {
        isRecommended: true,
        isHidden: false,
      },
      select: {
        title: true,
        image: true,
        description: true,
        id: true,
        price: true,
        updatedAt: true,
        category: {
          select: {
            categoryName: true,
            url: true,
            id: true,
          },
        },
      },
    });
    return drinks;
  }),
  getRecommendations: publicProcedure.input(z.object({ flag: z.boolean() })).query(async ({ ctx, input }) => {
    const drinks = await ctx.prisma.drink.findMany({
      where: {
        isRecommended: input.flag,
        isHidden: false,
      },
      select: {
        title: true,
        id: true,
      },
    });

    const count = await ctx.prisma.drink.count({
      where: {
        isRecommended: input.flag,
        isHidden: false,
      },
    });
    return { drinks, count };
  }),
  bulkUpdateRecomendations: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        flag: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.ids.length < 1) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Error: You must provide at least one product to update' });
      }

      const drink = await ctx.prisma.drink.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: {
          updatedAt: new Date(),
          isRecommended: input.flag,
        },
      });
      return drink;
    }),
  addProductToRecommended: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const drink = await ctx.prisma.drink.update({
        where: {
          id: input.id,
        },
        data: {
          updatedAt: new Date(),
          isRecommended: true,
        },
      });
      return drink;
    }),
});
