# Copyright by Alex Ellis MIT (https://github.com/openfaas-incubator/node10-express-template), adopted by Nicolai Schmid

FROM openfaas/of-watchdog:0.8.1 as watchdog

FROM node:15.14.0-alpine as ship

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN addgroup -S app && adduser -S -g app app

RUN apk --no-cache add ca-certificates

WORKDIR /root/

RUN mkdir -p /home/app

# Wrapper/boot-strapper
WORKDIR /home/app
COPY package.json ./

# This ordering means the yarn installation is cached for the outer function handler.
RUN yarn --no-cache --frozen-lockfile

# Copy outer function handler
COPY index.js ./

# COPY function node packages and install, adding this as a separate
# entry allows caching of yarn install
WORKDIR /home/app/function
COPY function/*.json ./
RUN yarn --noch-cache --frozen-lockfile || :

# COPY function files and folders
COPY function/ ./

# Set correct permissions to use non root user
WORKDIR /home/app/

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chown app:app -R /home/app \
    && chmod 777 /tmp

USER app

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

