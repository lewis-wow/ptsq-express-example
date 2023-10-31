# ptsq simple Express example

## ptsq docs

[https://ptsq-docs.vercel.app/](https://ptsq-docs.vercel.app/)

## Command to run the example

### Start the ptsq server

```bash
npm run start:server
```

### Start the proprietary client

```bash
npm run start:client
```

### Generate the schema from the server for remote cliet

```bash
npm run schema:generate
```

### Start the remote client

```bash
npm run start:remote-client
```

## What is interesting

Take a good look at `client.ts` and `remote-client.ts` and compare the codes. They are almost identical.

Try to change the `server.ts` resolver like this.

```ts
const baseRouter = router({
  greetings: resolver.query({
    input: z.object({
      name: z.number(),
    }),
    output: z.string(),
    resolve: ({ input }) => {
      return `Hello, ${input.name}`;
    },
  }),
});
```

And take a good look at `client.ts`, Typescript should display a type error.

You can also then regenerate the schema for `remote-client.ts` to see the same error.
