source ../.env

echo Starting MongoDB Container with version $MONGODB_VERSION...
docker run --name mongodb -d -p $DB_PORT:$DB_PORT mongodb/mongodb-community-server:$MONGODB_VERSION
echo -e "Done.\n"

echo Running db setup...
npx ts-node setupDB.ts
echo -e "Done.\n"