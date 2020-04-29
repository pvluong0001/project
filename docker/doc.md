### reload varnish config:
```shell script
docker-compose exec <varnish-service> bash /reload.sh
```

### check log varnish
```shell script
docker-compose exec <varnish-service> sh
varnishncsa
```

### dump all db
```shell script
docker-compose exec -T mongo mongodump --archive --gzip > dump.gz
```
