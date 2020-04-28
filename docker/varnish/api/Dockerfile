FROM varnish:6.4
COPY default.vcl /etc/varnish/
COPY reload.sh /reload.sh
RUN sed -i 's/\r$//' /reload.sh
