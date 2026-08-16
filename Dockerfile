FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000
ENV HOST=0.0.0.0

COPY --from=build /app/.output ./.output

EXPOSE 10000

CMD ["node", ".output/server/index.mjs"]