FROM node:7.3-slim

WORKDIR /usr/local/lib
COPY package.json .
RUN npm install --production
ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
COPY . /app
CMD ["node", "index.js"]
