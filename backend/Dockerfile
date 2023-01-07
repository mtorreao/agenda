FROM node:16.14.2-slim

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli@9.1.8 npm@8.19.2

COPY . .

RUN yarn && yarn build

CMD ["yarn", "start:prod"]