import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

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
        blurHash: z.string().nullish(),
        unitId: z.string().nullish(),
      }),
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
          blurHash: input.blurHash,
          category: {
            connect: {
              id: input.categoryId ?? 1,
            },
          },
          unit: input.unitId
            ? {
                connect: {
                  id: input.unitId,
                },
              }
            : undefined,
        },
      });
      return drink;
    }),

  getDrinks: publicProcedure.query(async ({ ctx }) => {
    const drinkIncludes: Prisma.DrinkInclude = {
      category: true,
      unit: true,
    };
    const drinks = await ctx.prisma.drink.findMany({
      orderBy: {
        title: 'asc',
      },
      include: drinkIncludes,
    });
    return drinks;
  }),
  getDrinkById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const singleDrink = await ctx.prisma.drink.findFirst({
      where: {
        id: input.id,
      },
      include: {
        unit: true,
        picture: true,
      },
    });
    if (singleDrink) return singleDrink;
  }),
  deleteDrink: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    try {
      return await ctx.prisma.drink.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'An unexpected error occurred, please try again later.' });
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
          blurHash: z.string().nullish(),
          unitId: z.string().nullish(),
          isRecommended: z.boolean(),
        }),
      }),
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
          blurHash: input.data.blurHash,
          unitId: input.data.unitId,
          isRecommended: input.data.isRecommended,
        },
      });
      return drink;
    }),
  removeProductImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          image: z.string().nullish(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const drink = await ctx.prisma.drink.update({
        where: {
          id: input.id,
        },
        data: {
          updatedAt: new Date(),
          image: input.data.image,
        },
      });
      return drink;
    }),
  hideProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const drink = await ctx.prisma.drink.update({
        where: {
          id: input.id,
        },
        data: {
          updatedAt: new Date(),
          isHidden: true,
        },
      });
      return drink;
    }),

  getFile: publicProcedure
    .input(
      z.object({
        key: z.string(),
        productId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const file = await ctx.prisma.picture.findFirst({
        where: {
          key: input.key,
          drinkId: input.productId,
        },
      });
      if (!file) throw new TRPCError({ code: 'NOT_IMPLEMENTED' });
    }),
  drinks: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.drink.findMany({
      include: { category: true, unit: true },
      orderBy: {
        id: 'asc',
      },
    });
  }),

  getPaginatedDrinks: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().optional().nullable(),
        id: z.number().optional(),
        searchTerm: z.string().min(3).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;

      const { cursor } = input;

      const items = await ctx.prisma.drink.findMany({
        take: limit + 1,
        include: { category: true, unit: true },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          updatedAt: 'desc',
        },
        where: {
          categoryId: input.id ? input.id : undefined,
          title: {
            search: input.searchTerm ? `${input.searchTerm}*` : undefined,
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
