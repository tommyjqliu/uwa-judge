#!/bin/bash
# empty file
> admin.secret
> restapi.secret
docker-compose exec domserver cat /opt/domjudge/domserver/etc/initial_admin_password.secret > admin.secret
docker-compose exec domserver cat /opt/domjudge/domserver/etc/restapi.secret | grep '^[^#]' | awk '{print $4}'  >  restapi.secret