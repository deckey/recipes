FROM node:15.3.0-alpine3.10
RUN apk add busybox-extras
WORKDIR /recipes
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
