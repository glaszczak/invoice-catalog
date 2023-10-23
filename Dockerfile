FROM node:18-alpine

WORKDIR /app

RUN node -v

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
