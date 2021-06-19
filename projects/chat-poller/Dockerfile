FROM node:14

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

CMD ["yarn", "serve"]

