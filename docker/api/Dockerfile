# ---- Base Node ----
FROM node:13.7.0-alpine

RUN apk update && apk add npm
RUN npm install -g nodemon

# Create app directory
RUN mkdir /api
WORKDIR /api

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh

EXPOSE 81
