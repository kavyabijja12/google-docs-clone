FROM node:20
WORKDIR /app
COPY ./ /app/backend
WORKDIR /app/backend
RUN npm install
EXPOSE 9000
CMD ["npm","start"]