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
  updateVolume: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          amount: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.unit.update({
        where: {
          id: input.id,
        },
        data: {
          amount: input.data.amount,
        },
      });
      return category;
    }),
  deleteVolume: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.unit.delete({
          where: {
            id,
          },
        });
      } catch (err) {
        console.warn(err);
      }
    }),
});
