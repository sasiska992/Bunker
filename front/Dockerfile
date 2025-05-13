FROM node:18-alpine3.20

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD ["start"]
