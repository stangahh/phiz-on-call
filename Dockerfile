FROM node:14 as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM node:14 as server

WORKDIR /app

COPY --from=builder --chown=node:node /usr/src/app/dist /app
COPY --from=builder --chown=node:node /usr/src/app/node_modules /app/node_modules
COPY --from=builder --chown=node:node /usr/src/app/public /app/public

EXPOSE ${PORT}

CMD ["node", "/app/index.js"]