# Build environment
FROM node:16.9.1 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile --silent
RUN yarn global add react-scripts
COPY . ./
CMD yarn build

# Production
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
