FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apk add --no-cache jq

RUN npm install -g @angular/cli

RUN npm install

RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["ng", "serve", "--host", "0.0.0.0"]
