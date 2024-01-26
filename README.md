# Sesame

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

This is a monorepo built with turborepo

- `api`: a `Nodejs` app with an ex`press server
- `web`: a `Nextjs` app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Getting Started

Clone this repository:

```sh
git clone https://github.com/Tiyyo/Sesame.git
```

If you don't have pnpm installed, install it:

```sh
npm install -g pnpm
```

Install all dependencies:

```sh
pnpm install
```

Start one of the apps:

```sh
pnpm <app-name> dev
```

You can check the `package.json` at the root to see how is referenced each app.

If you want to start all apps at once, you can use the `pnpm dev` command

if you need to install a shared dependency, you can use the this command:

```sh
pnpm <app-name> add <package-name>@workspace:x

```

All shared dependencies are this form @sesame/<package-name>

To create initial database and first migration run:

```sh
pnpm api db:migrate
```

Then generate types to infer types for the client from the database. :

```sh
pnpm api gen:types

```

This will generate a file in the types folder

##
