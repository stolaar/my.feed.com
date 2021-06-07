FROM node:12.14.1-alpine

WORKDIR /usr/src
RUN mkdir dashboard

# copy xplorer service and install dependencies
WORKDIR /usr/src/dashboard
COPY . .

RUN npm install

WORKDIR /usr/src/dashboard/client
RUN echo "GENERATE_SOURCEMAP=false" > ./.env

RUN npm ci --only=production

RUN npm run build

WORKDIR /usr/src/zipstream

# start services
CMD ["npm", "start"]
