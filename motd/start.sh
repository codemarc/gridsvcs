if [ ! -f ./.env ]; then
  node --no-warnings ./smash -k motd ./.env
fi

node --no-warnings --env-file=./.env ./motd.js server
