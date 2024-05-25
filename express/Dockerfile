FROM node:16
workdir /app
copy package*.json ./
ARG App_Env
RUN if [ "$App_Env"="development" ];\
        then npm install; \
        else npm install --only=production; \
        fi
COPY . ./
ENV port 3001
EXPOSE $port
CMD ["node","index.js"]
