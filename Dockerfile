FROM mhart/alpine-node:9.8.0
WORKDIR /app
RUN npm i -g npm@5.6.0
RUN apk add --no-cache bash openssh git gcc g++ make python curl
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run seed
CMD [ "npm" ,"start"]
