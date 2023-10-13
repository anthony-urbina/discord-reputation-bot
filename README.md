# Reputation Bot

A light backend application for discord-server admins who'd like to provide a system where members can read and write reviews about their transaction experiences with other users.

## Why I Built This

As a discord user, I noticed some servers with #review-channels where members would leave post transaction reviews for other members in a text thread, which made it difficult to find and track reviews for a specific user. I thought that adding a database would help with managing reviews as the amount of reviews in these channels increased.

## Technologies Used

- Next.js
- Prisma
- Discord API
- Ngrok

## Live Demo

Try the application live at [https://discord-reputation-bot.vercel.app/](https://discord-reputation-bot.vercel.app/)

## Features

- User can read a review
- User can leave a review

## Stretch Features

- Admin can delete reviews

## Preview

![bot-get](/public/gifs/bot-get.gif)
![bot-post](/public/gifs/bot-post.gif)

## Development

### System Requirements

- Node.js 18 or higher
- NPM 18 or higher

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/anthony-urbina/discord-reputation-bot
   cd discord-reputation-bot
   ```

1. Install all dependencies with NPM.

   ```shell
   npm install
   ```

1. Install Ngrok globally.

   ```shell
   npm install -g ngrok
   ```

1. Run Ngrok to expose your local server.

   ```shell
   ngrok http 3000
   ```

1. Import the example database to PostgreSQL.

   ```shell
   npm run db:import
   ```

1. Make a copy of the .env.example file. Name your copy `.env`.

   ```shell
   cp .env.example .env
   ```

1. Set up your environmental variables in `.env`. Replace `changeMe` with your own credentials.

   ```shell
   DISCORD_APP_ID="changeMe"
   DISCORD_PUBLIC_KEY="changeMe"
   DISCORD_PRIVATE_KEY="changeMe"
   ACCELERATE_DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=changeMe
   POSTGRES_URL_NON_POOLING="postgresql://user:changeMe@host:port/db_name?schema=public"
   ```

1. Create the tables in your database
   ```shell
   npx prisma db push
   ```
1. Generate Prisma Client:

   ```shell
   npx prisma generate --no-engine
   ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

   ```shell
   npm run dev
   ```

## Troubleshooting

1. If you are having any issues setting up Prisma Accelerate please visit [https://www.prisma.io/docs/data-platform/accelerate/getting-started](https://www.prisma.io/docs/data-platform/accelerate/getting-started)
