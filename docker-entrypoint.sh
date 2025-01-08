#!/bin/bash

echo "Starting docker-entrypoint.sh script..."

if [ -f ./prisma/schema.prisma ]; then
    echo "Found Prisma schema"
    npx prisma generate
else
    echo "No Prisma schema found"
fi

# Run migrations
npx prisma migrate deploy

# Start the application
exec "$@"
