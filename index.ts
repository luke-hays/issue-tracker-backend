import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql-schema';

const PORT = 3001;

const app: Express = express();

const startApolloServer = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};

void startApolloServer();

app.listen(PORT, (): void => {
  console.log(`App started on port ${PORT}`);
});