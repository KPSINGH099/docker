FROM node:16
workdir /app
copy package*.json ./
RUN npm install
COPY . ./
ENV port 3001
EXPOSE $port
CMD ["npm","run","dev"]
