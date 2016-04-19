#FROM ubuntu:latest
FROM resin/rpi-raspbian

RUN apt-get update && apt-get upgrade
RUN apt-get install -y curl npm
RUN npm install n -g
RUN n 5.10.1
RUN apt-get remove nodejs
#RUN npm install supervisor -g

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install --production

ADD . /app/

CMD ["node", "web.js"]
