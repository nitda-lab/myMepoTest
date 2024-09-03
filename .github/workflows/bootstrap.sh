#!/bin/sh -e
nginx
(
  export PGHOST=$DB_HOST
  export PGUSER=$DB_USER
  export PGPASSWORD=$DB_PASSWORD
  export PGDATABASE=postgres
  psql -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || psql -c "CREATE DATABASE $DB_NAME";
)
npm run db:init
npm start
