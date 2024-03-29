#!/bin/bash

. ./.env

# Get secret
>password.admin
>password.judgehost
docker-compose -p $DOCKER_PROJECT exec domserver cat /opt/domjudge/domserver/etc/initial_admin_password.secret >password.admin
docker-compose -p $DOCKER_PROJECT exec domserver cat /opt/domjudge/domserver/etc/restapi.secret | grep '^[^#]' | awk '{print $4}' >password.judgehost

# SQL queries to create the database and user
SQL_QUERY_CREATE_DB="CREATE DATABASE IF NOT EXISTS $MySQL_DATABASE_UWAJUDGE;"
SQL_QUERY_GRANT_PRIVILEGES="GRANT ALL PRIVILEGES ON $MySQL_DATABASE_UWAJUDGE.* TO '$MYSQL_USER'@'%';"

# Define number of retries and wait time
MAX_TRIES=10
RETRY_WAIT=5

# Loop for connecting to database
for i in $(seq 1 $MAX_TRIES); do
    #   docker-compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1"
    docker-compose -p $DOCKER_PROJECT exec mariadb ls /run/mysqld/mysqld.sock
    if [ $? -eq 0 ]; then
        break
    fi
    echo "Waiting for MariaDB to start ($i/$MAX_TRIES attempts)..."
    sleep $RETRY_WAIT
done

# Check if connection successful
if [ $? -eq 0 ]; then
    echo "MariaDB connection successful, proceeding with database setup..."
    docker-compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "$SQL_QUERY_CREATE_DB"
    docker-compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "$SQL_QUERY_GRANT_PRIVILEGES"
    docker-compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;"
else
    echo "ERROR: Could not connect to MariaDB after $MAX_TRIES retries. Aborting."
    exit 1
fi
