#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 2
done

echo "✅ MySQL is ready"

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "🟢 Starting backend..."
npm start
