FROM node:16-slim

RUN set -eux; \
    apt-get --yes update; \
    apt-get --yes install \
        git

WORKDIR /app
ADD . .

EXPOSE 3000

RUN set -eux; \
    yarn install --frozen-lockfile; \
    yarn build; \
    yarn install --prod; \
    yarn cache clean

CMD ["yarn", "start"]
