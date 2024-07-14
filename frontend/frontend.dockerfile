FROM node:20 as build-step

WORKDIR /app

COPY ./build ./build

EXPOSE 3000

FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
# COPY ./client/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf