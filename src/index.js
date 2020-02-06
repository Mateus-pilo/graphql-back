import { ApolloServer, gql} from 'apollo-server';
import { importSchema } from 'graphql-import';
import * as resolvers from './resolvers';
import models from '../sequelize/models';

const schemaPath = 'src/schema/index.graphql'

const { sequelize } = models;

sequelize.authenticate().then(() => {
  console.log(`Synchronizing database`);

  sequelize.sync().then(() => {
    console.log(`Synchronized database`);
  });

  const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers
  })
  server.listen().then(({ url }) => {
      console.log(`Executando em ${url}`)
  })
  
});
  


