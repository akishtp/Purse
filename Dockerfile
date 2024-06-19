FROM node:22-alpine AS builder

RUN corepack enable

WORKDIR /
COPY package*.json ./
RUN pnpm install
RUN pnpm db:push
COPY . .
EXPOSE 3000
CMD [ "pnpm", "dev" ]