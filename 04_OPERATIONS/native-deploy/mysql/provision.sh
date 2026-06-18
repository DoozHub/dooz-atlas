#!/usr/bin/env bash
# Dooz ecosystem — MySQL 8 native provisioning.
# Idempotent; safe to re-run. Requires sudo + mysql root.
set -euo pipefail

DB_ROOT_PASSWORD_FILE="${DB_ROOT_PASSWORD_FILE:-/etc/dooz/secrets/mysql-root}"
DOOZ_DB_PASSWORD_FILE="${DOOZ_DB_PASSWORD_FILE:-/etc/dooz/secrets/db-password}"

DB_ROOT_PASSWORD=$(sudo cat "$DB_ROOT_PASSWORD_FILE")
DOOZ_DB_PASSWORD=$(sudo cat "$DOOZ_DB_PASSWORD_FILE")

sudo mysql --protocol=socket -uroot <<SQL
CREATE DATABASE IF NOT EXISTS dooz_core      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS operator_engine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pm_suite        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'dooz_app'@'localhost' IDENTIFIED BY '${DOOZ_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON dooz_core.*      TO 'dooz_app'@'localhost';
GRANT ALL PRIVILEGES ON operator_engine.* TO 'dooz_app'@'localhost';
GRANT ALL PRIVILEGES ON pm_suite.*        TO 'dooz_app'@'localhost';
FLUSH PRIVILEGES;
SQL

echo "MySQL provisioning complete. Databases: dooz_core, operator_engine, pm_suite. User: dooz_app@localhost."
