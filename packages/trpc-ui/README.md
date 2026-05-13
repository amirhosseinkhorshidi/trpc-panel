# tRPC.ui()

![Project Preview](screenshot.png)

Probably the easiest and cheapest way to build a testing UI and documentation for your tRPC v11.0 endpoints. tRPC ui automatically generates a UI for manually testing your tRPC backend with 0 overhead:

trpc panel moves as fast as your trpc backend with minimal effort.

## Installation

Install the package from [npm](https://www.npmjs.com/package/@ajayche/trpc-panel):

```bash
# npm
npm install @ajayche/trpc-panel

# pnpm
pnpm add @ajayche/trpc-panel

# yarn
yarn add @ajayche/trpc-panel

# bun
bun add @ajayche/trpc-panel
```

## Usage

`renderTrpcPanel` generates an HTML string that you serve from any endpoint. Pass your tRPC router and an options object:

```ts
renderTrpcPanel(router, options)
```

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `url` | `string` | ✅ | URL of your tRPC endpoint (e.g. `/trpc`) |
| `transformer` | `"superjson"` | — | Enable superjson transformer support |
| `meta` | `{ title?, description? }` | — | Panel title and description (supports markdown) |
| `cache` | `boolean` | — | Cache parsed router |
| `logFailedProcedureParse` | `boolean` | — | Log procedures that fail to parse |

---

### Express

```ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { renderTrpcPanel } from "@ajayche/trpc-panel";
import { appRouter } from "./router";

const app = express();

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.get("/panel", (_req, res) => {
  res.send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/trpc",
      transformer: "superjson",
    })
  );
});

app.listen(3000);
```

---

### Fastify

```ts
import Fastify from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { renderTrpcPanel } from "@ajayche/trpc-panel";
import { appRouter } from "./router";

const app = Fastify();

app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

app.get("/panel", (_req, reply) => {
  reply.type("text/html").send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/trpc",
      transformer: "superjson",
    })
  );
});

app.listen({ port: 3000 });
```

---

### Next.js — Pages Router

Create `pages/api/panel.ts`:

```ts
import type { NextApiRequest, NextApiResponse } from "next";
import { renderTrpcPanel } from "@ajayche/trpc-panel";
import { appRouter } from "~/server/api/root";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.send(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      transformer: "superjson",
    })
  );
}
```

---

### Next.js — App Router

Create `app/api/panel/route.ts`:

```ts
import { renderTrpcPanel } from "@ajayche/trpc-panel";
import { appRouter } from "~/server/api/root";

export function GET() {
  return new Response(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      transformer: "superjson",
    }),
    { headers: { "Content-Type": "text/html" } }
  );
}
```

---

### Adding descriptions to procedures

Import `TRPCPanelMeta` and pass it to `.meta()` when initializing tRPC:

```ts
import { initTRPC } from "@trpc/server";
import type { TRPCPanelMeta } from "@ajayche/trpc-panel";

const t = initTRPC.meta<TRPCPanelMeta>().create();

export const router = t.router({
  getUser: t.procedure
    .meta({ description: "Fetch a user by ID" })
    .input(z.object({ id: z.string() }))
    .query(({ input }) => getUserById(input.id)),
});
```

---

## Fork Notice

This is a fork of the original [tRPC panel](https://github.com/iway1/trpc-panel) project, which is now unmaintained. The [original author](https://github.com/iway1) deserves credit for the vast majority of the work done on this project.

## Features

- 🚀 Automatically inspect your tRPC router and recursively generate a typesafe UI
- 🕒 Zero overhead
  - No output schemas (procedure return types can be inferred as nature intended)
  - New procedures will be added to your UI as you create them in your backend
  - No compilation required, works with any backend
- 🐦 Supports nested routers, and nested input objects. The structure of the UI maps one-to-one to your API's routers and procedures.
- ✨ Transform  data with built in `superjson` support.
- 🎨 UI/UX changes and improvements
- ⚡ Optimized with `Zod version 4`
- 🚀 Optimized for `tRPC version 11.8.0` and higher
