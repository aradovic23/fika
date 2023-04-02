import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const volumeRouter = createTRPCRouter({
  createVolumeOption: publicProcedure
    .input(
      z.object({
        amount: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const volume = await ctx.prisma.unit.create({
        data: {
          amount: input.amount,
        },
      });
      return volume;
    }),
  getVolumeOptions: publicProcedure.query(async ({ ctx }) => {
    const volumeOptions = await ctx.prisma.unit.findMany();
    return volumeOptions;
  }),
  updateStore: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          logo: z.string().optional(),
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
          logo: input.data.logo,
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
