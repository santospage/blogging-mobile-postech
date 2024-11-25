FROM node:latest

WORKDIR /blogging-mobile-postech

COPY package*.json ./

RUN npm install -g expo-cli && npm install

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel"]
