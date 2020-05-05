#!/bin/bash
cp .env.example .env
yarn install
yarn run watch:dev
