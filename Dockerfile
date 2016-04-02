FROM ubuntu:latest
#FROM resin/rpi-raspbian

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install --yes nodejs
RUN npm install supervisor -g

WORKDIR /app
CMD ["supervisor", "web.js"]
