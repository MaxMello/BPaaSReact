FROM nginx:stable-alpine

ADD build /usr/share/nginx/html
ADD src/index.html /usr/share/nginx/html

