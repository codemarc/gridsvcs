FROM node:lts-alpine

WORKDIR /gridsvcs

COPY ./ .

RUN chown -R node /gridlinks
USER node
CMD ["node", "app.js"]
