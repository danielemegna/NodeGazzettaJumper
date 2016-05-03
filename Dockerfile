#FROM ubuntu:latest
FROM resin/rpi-raspbian

RUN apt-get update && apt-get upgrade
RUN apt-get install -y curl npm
RUN npm install n -g
RUN n 5.10.1
RUN apt-get remove nodejs && apt-get autoremove

WORKDIR /usr/local/lib
COPY package.json .
RUN npm install --production
ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
CMD ["node", "web.js"]
