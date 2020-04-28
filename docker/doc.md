### reload varnish config:
```shell script
docker-compose exec <service> bash /reload.sh
```

### dump all db
```shell script
docker-compose exec -T main-mongo mongodump --archive --gzip > dump.gz
```
