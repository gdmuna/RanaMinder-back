ARG VERSION="22-slim"

FROM node:${VERSION} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm prune --production

FROM node:${VERSION}
EXPOSE 33001
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

CMD ["npm", "run", "start:prod"]
