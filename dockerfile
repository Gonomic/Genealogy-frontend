FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build package
COPY ./dist /usr/share/nginx/html

EXPOSE 1001 1001

ENTRYPOINT ["nginx", "-g", "daemon off;"]

