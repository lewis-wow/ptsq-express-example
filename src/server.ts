import { createServer, expressAdapter, ExpressAdapterContext } from '@ptsq/server';
import express from 'express';
import { z } from 'zod';

const app = express();

const { router, resolver, serve } = createServer({
  ctx: async ({ req, res }: ExpressAdapterContext) => ({
    req,
    res,
  }),
});

const baseRouter = router({
  greetings: resolver.query({
    input: z.object({
      name: z.string(),
    }),
    output: z.string(),
    resolve: ({ input }) => {
      return `Hello, ${input.name}`;
    },
  }),
});

app.use('/ptsq', expressAdapter(serve({ router: baseRouter })));

app.listen(4000, () => {
  console.log('Listening on: http://localhost:4000/ptsq');
});

export type BaseRouter = typeof baseRouter;
