FROM node:lts-alpine3.13 AS TEMP

WORKDIR /bdd/

RUN apk update && apk add --no-cache npm git ca-certificates
RUN git clone https://github.com/Victoreisdavid/Searcher_bot.git .
RUN rm -rf /bdd/src/config.js

COPY config.yaml /bdd/src/config.js
COPY .env /bdd/.env

RUN npm install .

FROM node:lts-alpine3.13 AS RUNNER

WORKDIR /bdd/

COPY --from=TEMP /bdd/ /bdd/

CMD ["node", "index.js"]

VOLUME ["/bdd/"]
