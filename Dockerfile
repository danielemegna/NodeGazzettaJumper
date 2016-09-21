FROM ubuntu:latest
#FROM resin/rpi-raspbian

RUN apt-get update
RUN apt-get install -y curl npm
RUN npm install n -g
RUN n latest
RUN apt-get remove -y nodejs && apt-get autoremove -y 

WORKDIR /usr/local/lib
COPY package.json .
RUN npm install --production
ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
CMD ["node", "index.js"]
