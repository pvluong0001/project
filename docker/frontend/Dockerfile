# develop stage
FROM node:13.7.0-alpine
RUN mkdir /frontend
WORKDIR /frontend
RUN apk update && apk add yarn
RUN yarn global add @quasar/cli
COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh

EXPOSE 8080
