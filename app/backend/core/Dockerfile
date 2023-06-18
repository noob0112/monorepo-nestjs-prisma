FROM node:18.12.1-alpine as builder

RUN npm init --yes && \
    npm install -g pnpm

USER node

WORKDIR /home/node/app

COPY --chown=node:node package.json ./

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm prisma:generate

RUN pnpm build

RUN pnpm install --prod

FROM node:18.12.1-alpine as product

EXPOSE 3000

RUN npm init --yes && \
    npm install -g pnpm

USER node

WORKDIR /home/node/app

COPY --chown=node:node package.json ./
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/dist ./dist

CMD [ "node", "./dist/main.js" ]
