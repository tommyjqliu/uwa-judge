#!/bin/bash
# empty file
> password.admin
> password.judgehost
docker-compose exec domserver cat /opt/domjudge/domserver/etc/initial_admin_password.secret > password.admin
docker-compose exec domserver cat /opt/domjudge/domserver/etc/restapi.secret | grep '^[^#]' | awk '{print $4}'  >  password.judgehost