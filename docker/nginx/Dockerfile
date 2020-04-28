FROM nginx
RUN rm -r /etc/nginx/conf.d/*
ADD conf.d/ /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 81
