import { createTRPCRouter } from './trpc';
import { drinksRouter } from './routers/drinksRouter';
import { categoryRouter } from './routers/categoryRouter';
import { settingsRouter } from './routers/settingsRouter';
import { volumeRouter } from './routers/volumeRouter';
import { recommendationsRouter } from './routers/recommendationsRouter';

export const appRouter = createTRPCRouter({
  drinks: drinksRouter,
  categories: categoryRouter,
  settings: settingsRouter,
  volume: volumeRouter,
  recommendations: recommendationsRouter,
});

export type AppRouter = typeof appRouter;
