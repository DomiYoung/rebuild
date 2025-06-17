FROM 10.10.220.110:9192/base/nginx:1.23.1
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
EXPOSE 80
COPY . /usr/share/nginx/html
ENTRYPOINT nginx -g "daemon off;"
