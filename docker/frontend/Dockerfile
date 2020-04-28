# develop stage
FROM node:13.7.0-alpine
RUN mkdir /frontend
WORKDIR /frontend
RUN apk update && apk add yarn
RUN yarn global add @quasar/cli

EXPOSE 8080
