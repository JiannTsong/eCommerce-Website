FROM nginx:stable-alpine-slim
COPY . /var/html/www/
EXPOSE 80
