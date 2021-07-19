FROM node:14.17-alpine

RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

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
