#!/bin/sh

# Wait for database to be ready (redundant with healthcheck but good practice)
echo "Waiting for database..."
sleep 5

# Run migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Run seed if seed script exists in package.json
# if [ -f "prisma/seed.ts" ]; then
#     echo "Running seed script..."
#     npx prisma db seed
# fi

echo "Prisma initialization completed!"
