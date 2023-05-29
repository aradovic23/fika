import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
  createStore: publicProcedure
    .input(
      z.object({
        name: z.string(),
        fileUrl: z.string().nullish(),
        fileKey: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const store = await ctx.prisma.store.create({
        data: {
          name: input.name,
          fileUrl: input.fileUrl,
          fileKey: input.fileKey,
        },
      });
      return store;
    }),
  getStore: publicProcedure.query(async ({ ctx }) => {
    const store = await ctx.prisma.store.findFirst();
    return store;
  }),
  updateStore: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          fileUrl: z.string().nullish(),
          fileKey: z.string().nullish(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.store.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.data.name,
          fileUrl: input.data.fileUrl,
          fileKey: input.data.fileKey,
        },
      });
      return category;
    }),
  deleteStore: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.store.delete({
          where: {
            id,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    }),
});
