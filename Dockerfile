FROM node:12.14.1-alpine

WORKDIR /usr/src
RUN mkdir myfeed

# copy xplorer service and install dependencies
WORKDIR /usr/src/myfeed
COPY . .

RUN npm install

WORKDIR /usr/src/myfeed/client
RUN echo "GENERATE_SOURCEMAP=false" > ./.env

RUN npm install

RUN npm run build

WORKDIR /usr/src/myfeed

# start services
CMD ["npm", "start"]
