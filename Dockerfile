FROM nginx:1.27-alpine
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/README.md \
 && printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  error_page 404 /404.html;\n  location / { try_files $uri $uri.html $uri/ =404; }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
