FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server ./server
COPY client ./client
COPY data ./data

RUN npm install
RUN npm --prefix client install
RUN npm --prefix client run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node","server/index.js"]
