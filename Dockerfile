FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3001

CMD ["npx", "ts-node", "src/server.ts"]
