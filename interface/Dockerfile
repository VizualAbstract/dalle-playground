FROM node:lts-slim

EXPOSE 3000

COPY package.json /code/package.json

COPY yarn-lock.json /code/yarn-lock.json

WORKDIR /code

COPY . /code

RUN npm install

CMD npm start
