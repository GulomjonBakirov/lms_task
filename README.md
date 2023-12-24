# Learning Management System

## Getting started

### Installation

```bash
$ pnpm install
```

### Copy `.env.example` to `.env`

```bash
$ cp .env.example .env
```

### Run the project

```bash
$ docker-compose up
$ npx prisma migrate dev
$ npx prisma db push
$ npm run seed
```
copy users email and passwords for using login system

### Documentation on SWAGGER

**http://{HOST}:{PORT}/docs**

### Build the project

```bash
$ pnpm build
```

### Run the project

```bash
# Run the project in development mode
$ pnpm start

# Run the project in watch mode
$ pnpm start:watch

# Run the project in debug mode
$ pnpm start:debug
```

Enjoy!
