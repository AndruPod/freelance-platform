FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5000

RUN useradd -m app
USER app

CMD ["npm", "run", "dev"]