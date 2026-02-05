# tRPC.ui()

Probably the easiest and cheapest way to build a testing UI and documentation for your tRPC v11.0 endpoints. tRPC ui automatically generates a UI for manually testing your tRPC backend with 0 overhead:

trpc panel moves as fast as your trpc backend with minimal effort.

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
