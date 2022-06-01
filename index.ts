/* eslint-disable @typescript-eslint/no-unsafe-return */
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';

const PORT = 3001;

let aboutMessage = "Issue Tracker API v1.0";
const issuesDB = [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('2019-01-15'), due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('2019-01-16'), due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
  },
];
const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setAboutMessage(_: any, { message }: any): any {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return aboutMessage = message;
}
function issueList() {
  return issuesDB;
} 

const app: Express = express();

const startApolloServer = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};

void startApolloServer();

app.listen(PORT, (): void => {
  console.log(`App started on port ${PORT}`);
});