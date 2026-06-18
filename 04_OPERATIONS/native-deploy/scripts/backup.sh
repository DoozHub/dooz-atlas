#!/usr/bin/env bash
# Dooz ecosystem — nightly backup.
# Writes to /opt/dooz/backups/<date>/, with 14-day retention by default.
set -euo pipefail

BACKUP_ROOT="${BACKUP_ROOT:-/opt/dooz/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TS=$(date -u +%Y%m%dT%H%M%SZ)
DEST="${BACKUP_ROOT}/${TS}"
mkdir -p "$DEST"

DB_PASSWORD_FILE="${DB_PASSWORD_FILE:-/etc/dooz/secrets/db-password}"
DB_PASSWORD=$(sudo cat "$DB_PASSWORD_FILE")

echo "[$(date -Iseconds)] backing up to $DEST"

# 1. MySQL dumps (per database)
for db in dooz_core operator_engine pm_suite; do
  mysqldump --protocol=socket -u dooz_app -p"$DB_PASSWORD" \
    --single-transaction --routines --triggers --events \
    "$db" | gzip > "$DEST/${db}.sql.gz"
  echo "  $db: $(du -h "$DEST/${db}.sql.gz" | cut -f1)"
done

# 2. In-memory state snapshots from operator-engine
if curl -fsS --max-time 5 http://127.0.0.1:8001/health >/dev/null; then
  curl -fsS http://127.0.0.1:8001/api/v1/snapshot > "$DEST/operator-engine-snapshot.json" || true
  echo "  operator-engine snapshot: $(du -h "$DEST/operator-engine-snapshot.json" | cut -f1)"
fi

# 3. SQLite files (bridge, perspective, pm-suite)
for f in /opt/dooz/data/bridge.sqlite /opt/dooz/data/perspective.db /opt/dooz/data/pm-suite.db; do
  if [ -f "$f" ]; then
    cp "$f" "$DEST/$(basename "$f")"
    echo "  $(basename "$f"): copied"
  fi
done

# 4. Retention: delete anything older than RETENTION_DAYS
find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -mtime "+${RETENTION_DAYS}" -exec rm -rf {} +

echo "[$(date -Iseconds)] backup complete: $DEST"
