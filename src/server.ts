import { HTTPError, createServer } from '@ptsq/server';
import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();

const createContext = async ({ req, res }: { req: Request; res: Response }) => {
  const user = 'admin' as 'admin' | 'user' | undefined;

  return {
    req,
    res,
    user,
  };
};

const { router, resolver, serve } = createServer({
  ctx: createContext,
});

const authedResolver = resolver.use(({ ctx, next }) => {
  if (!ctx.user) throw new HTTPError({ code: 'UNAUTHORIZED' });

  return next({
    ...ctx,
    user: ctx.user,
  });
});

const greetingsQuery = resolver
  .args(
    z.object({
      name: z.string(),
    })
  )
  .transformation({
    name: (input) => input.length,
  })
  .transformation({
    name: (input) => [input] as const,
  })
  .args(
    z.object({
      name: z.string(),
    })
  )
  .output(z.string())
  .query(({ input }) => {
    return `Hello, ${input.name}`;
  });

const baseRouter = router({
  greetings: greetingsQuery,
});

app.use((req, res) => serve(baseRouter)(req, res));

app.listen(4000, () => {
  console.log('Listening on: http://localhost:4000/ptsq');
});

export type BaseRouter = typeof baseRouter;
