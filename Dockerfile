FROM node:20.10.0

WORKDIR /src

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .

ENV PORT=4000
ENV MONGO_URI=mongodb://localhost:27017/questionPro-assignment-grocery
ENV JWT_SECRET=secret_key

EXPOSE 4000

CMD ["node", "src/server.ts"]