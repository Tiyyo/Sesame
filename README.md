# Sesame

## What's inside?

In order to have api and client web in the same repository, we use a monorepo structure with `pnpm` as package manager.</br>
The monorepo is configured with `Turborepo` </br>

- `api`: a `Nodejs` app with an ex`press server
- `web`: a `Nextjs` app
- `@sesame/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@sesame/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@sesame/schema`: a shared package containing all the zod schemas

## Getting Started

Clone this repository:

```sh
git clone https://github.com/Tiyyo/Sesame.git
```

Nodejs and npm are required to run the project</br>
If you don't have pnpm installed, install it:

```sh
npm install -g pnpm
```

Install all dependencies:

```sh
pnpm install
```

The API need a shared dependency to be built, so run this command first:</br>
You may have to remove `tsconfig.tsbuildinfo` in the schema folder if dist folder is not created

```sh
pnpm schema build
```

if you need to install a shared dependency, you can use the this command:</br>
All shared dependencies are this form @sesame/<package-name>

```sh
pnpm <app-name> add <package-name>@workspace:x
```

To initialize and run the frist migration, run this command:</br>
The project use a SQLite database, so you don't need to install a database server

```sh
pnpm api db:migrate
```

In order to generate types after instrocpection of the database,
you need first to create a .env file with the following variables:

```sh
DATABASE_URL=`absolute path to the database file`
```

The file should be located in the database folder</br>
</br>

_Optional_ :
Then run the following command to generate type:

```sh
pnpm api gen:types
```

This will generate a file in the types folder

By default api will run on port 8000 and web on port 3000</br>
Before starting the apps, you need to create a .env file at the root of web folder with the following variables:

```sh
API_BASE_URL=http://localhost:<API_PORT>
```

Start one of the apps :</br>
You can check the `package.json` at the root to see how is referenced each app.</br>
If you want to start all apps at once, you can use the `pnpm dev` command

```sh
pnpm <app-name> dev
```

## Structure

### API

The api is structured by modules, and each module have it's own folder with the following structure:

- `route.ts`: contains the routes of the module
- `index.ts` : export services and models of the module
- `models`: database layer of the module
- `controllers`: http layer of the module
- `services`: contains the logic of the module

### Web

The web app follow the standard nextjs structure which is explained in the nextjs documentation

### Shared

Both api and web use the shared dependency to validate zod schema

## Choice of technologies and Comments

#### Database and Authnetication

I wasn't sure if the articles to be displayed were supposed to simulate a call to the database. I assumed this was the case and that the user needed to be authorized to access these data. Therefore, user authentication should take place on the Express server. I used SQLite because it requires no special installation. Users are identified by tokens stored in the database.

#### Technology Choice and Authentication Implementation

I wanted to use the NextAuth library for authentication management on Next.js. After some research, the implementation with an external API seemed extremely complicated. As a result, I implemented authentication by credentials as proposed in the Next.js documentation, using API Routes and middleware.

#### Style and Frontend

Regarding style, I used panda-css, a library I wanted to try. Initially, I started with Tailwind for the speed of styling, but I had to find another solution after a bug appeared, which I believe was due to server components, with half of the tokens no longer being associated with a class. I didn't put much effort into styling because i thought it was not the prupose of the test.

#### Data Validation:

The data from the users are validated on both the client side and the Express server side with Zod. I used the React-hook-form library on Next.js and a middleware that I coded on the Express server. Ideally, i would add a sanitzer on the express server.

#### Testing

I use Vitest to write some unit tests on the API

#### Encountered Difficulties

The main difficulties I encountered were with Next.js, the misunderstanding of server components, the blurred line between server and client, and more generally some APIs rewritting by Next.js
