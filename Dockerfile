#Stage 1
FROM node:18.16.0 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --force
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.25.5
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
