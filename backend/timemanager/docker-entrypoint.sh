#!/bin/bash

if [ "$1" = 'mix' ]; then
    mix deps.get

    echo "Testing if Postgres is accepting connections. {$PGHOST} {$PGPORT} ${PGUSER}"
    while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
    do
      echo "$(date) - waiting for database to start"
      sleep 2
    done

    if [[ -z `psql -Atqc "\\list $PGDATABASE"` ]]; then
      echo "Database $PGDATABASE does not exist. Creating..."
      mix ecto.setup
      mix ecto.migrate
      echo "Database $PGDATABASE created."
    fi
fi

exec "$@"
