FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY config-overrides.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

FROM nginx:1.18
EXPOSE 80
EXPOSE 443

COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY y-chung_com/y-chung_com.crt /etc/nginx
COPY y-chung_com/y-chung_com.key /etc/nginx

