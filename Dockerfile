FROM node:14-alpine

COPY package*.json /tmp

RUN cd /tmp && npm ci && mkdir -p /opt/app

COPY . /opt/app

RUN mv /tmp/node_modules /opt/app/

WORKDIR /opt/app

RUN npm run build

ENTRYPOINT ["/usr/local/bin/node"]
CMD ["/opt/app/server/entry.js"]
