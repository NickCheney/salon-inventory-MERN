MONGODB_VERSION=7.0-ubi8
echo Starting MongoDB Container with version $MONGODB_VERSION...
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:$MONGODB_VERSION
echo -e "Done.\n"

echo Running db setup...
npx ts-node setupDB.ts
echo -e "Done.\n"