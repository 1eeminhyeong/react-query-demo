FROM public.ecr.aws/docker/library/node:20-alpine AS build
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /root

COPY . .
RUN npm install -g pnpm
RUN pnpm clean:all
RUN pnpm install
RUN pnpm build
