#!/bin/bash

# Set these variables
POSTGRES_HOST="postgres"         # Hostname of your PostgreSQL server
POSTGRES_USER="$POSTGRES_USER"   # PostgreSQL user (set environment variable)
DB_NAME=$POSTGRES_DB               # Name of the database to reset
BACKUP_FILE="/app/initial_data.dump"  # Path to the backup file
export PGPASSWORD="$POSTGRES_PASSWORD" # PostgreSQL password (set environment variable)

# Function to execute a psql command
execute_psql() {
    psql -h $POSTGRES_HOST -U $POSTGRES_USER -d postgres -c "$1"
}

# Terminate connections to the database
echo "Terminating connections to the database $DB_NAME..."
execute_psql "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';"

# Drop the existing database
echo "Dropping database $DB_NAME..."
execute_psql "DROP DATABASE IF EXISTS $DB_NAME;"

# Create a new database
echo "Creating database $DB_NAME..."
execute_psql "CREATE DATABASE $DB_NAME;"

# Restore from backup
echo "Restoring database $DB_NAME from $BACKUP_FILE..."
pg_restore -h $POSTGRES_HOST -U $POSTGRES_USER -d $DB_NAME "$BACKUP_FILE"

echo "Database reset and restored successfully."