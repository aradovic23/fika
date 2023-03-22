import { createTRPCRouter } from "./trpc";
import { drinksRouter } from "./routers/drinksRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { settingsRouter } from "./routers/settingsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  drinks: drinksRouter,
  categories: categoryRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
