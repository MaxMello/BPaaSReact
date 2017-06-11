FROM nginx:stable-alpine

ADD src/index.html /usr/share/nginx/html
ADD build /usr/share/nginx/html
