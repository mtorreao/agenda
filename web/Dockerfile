FROM node:16.14.2-slim

WORKDIR /usr/src/app

RUN npm install -g @angular/cli@9

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

RUN yarn build