# ---- Base Node ----
FROM node:13.7.0-alpine

RUN apk update && apk add yarn
RUN yarn add global nodemon
# Create app directory
RUN mkdir /api
WORKDIR /api

EXPOSE 8081
