FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install && npm run build
ENV PORT 80
ENV NODE_ENV production
EXPOSE 80
CMD [ "npm", "start" ]
