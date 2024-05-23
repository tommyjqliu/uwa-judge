#!/bin/bash

. ./.env

# 1. Set up database
# SQL queries to create the database and user
# SQL_QUERY_CREATE_DB="CREATE DATABASE IF NOT EXISTS $MySQL_DATABASE_UWAJUDGE;"
# SQL_QUERY_GRANT_PRIVILEGES="GRANT ALL PRIVILEGES ON $MySQL_DATABASE_UWAJUDGE.* TO '$MYSQL_USER'@'%';"
SQL_QUERY_GRANT_DB="GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%';"
sock_file="/run/mysqld/mysqld.sock"

# Define number of retries and wait time
MAX_TRIES=10
RETRY_WAIT=5

# Loop for connecting to database
for i in $(seq 1 $MAX_TRIES); do
    output=$(docker compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1" 2>&1)
    result=$?
    if [ "$result" -eq 0 ]; then
        break
    fi
    echo "Waiting for MariaDB to start ($i/$MAX_TRIES attempts)..."
    sleep $RETRY_WAIT
done

# Check if connection successful
if [ "$result" -eq 0 ]; then
    echo "MariaDB connection successful, proceeding with database setup..."
    sleep 1
    # docker compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "$SQL_QUERY_CREATE_DB"
    # docker compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "$SQL_QUERY_GRANT_PRIVILEGES"
    docker compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "$SQL_QUERY_GRANT_DB"
    docker compose -p $DOCKER_PROJECT exec mariadb mariadb -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;"
else
    echo "ERROR: Could not connect to MariaDB after $MAX_TRIES retries. Aborting."
    exit 1
fi

# Wait for domjudge on
for i in $(seq 1 $MAX_TRIES); do
    response=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:8000/public)
    if [ "$response" -eq 200 ]; then
        break
    fi
    echo "Waiting for Domjudge to ready ($i/$MAX_TRIES attempts)..."
    sleep $RETRY_WAIT
done

if [ "$response" -eq 200 ]; then
    echo "Domjudge is ready, proceeding with setup..."
    sleep 1
    # # Get secret
    # >password.admin
    # >password.judgehost
    # docker compose -p $DOCKER_PROJECT exec domserver cat /opt/domjudge/domserver/etc/initial_admin_password.secret >password.admin
    # docker compose -p $DOCKER_PROJECT exec domserver cat /opt/domjudge/domserver/etc/restapi.secret | grep '^[^#]' | awk '{print $4}' >password.judgehost
    # if [ "$NODE_ENV" = "production" ]; then
    #     docker compose -p $DOCKER_PROJECT exec uwajudge npx prisma migrate reset --force
    # else
    #     npx prisma migrate reset --force
    # fi
    npx prisma migrate reset --force
else
    echo "ERROR: Could not connect to Domjudge after $MAX_TRIES retries. Aborting."
    exit 1
fi
