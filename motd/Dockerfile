FROM node:lts-alpine
LABEL org.opencontainers.image.source https://github.com/codemarc/gridsvcs

WORKDIR /gridsvcs/motd

COPY ./ .

RUN chown -R node /gridsvcs/motd
RUN yarn global add node-gyp && yarn

USER node
CMD ["node", "./motd.js"]
