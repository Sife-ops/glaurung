FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN mkdir database
EXPOSE 4000
CMD ["sh", "-c", "npm run migrate; npm run start"]
