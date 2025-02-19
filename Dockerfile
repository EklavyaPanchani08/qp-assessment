FROM node:20.10.0

WORKDIR /src

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

CMD ["npm", "start"]