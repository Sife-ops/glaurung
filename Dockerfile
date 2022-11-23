FROM node:16-alpine
RUN apk add --update tini
WORKDIR /app
COPY . .
RUN npm install
WORKDIR /app/api
RUN npm run build
RUN mkdir database
EXPOSE 4000
CMD ["sh", "-c", "npm run migrate; npm run start"]
