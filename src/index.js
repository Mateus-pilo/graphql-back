import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import * as resolvers from "./resolvers";
import * as resolversLogin from "./resolvers/query/login";
import { context } from './utils/context';
import models from "../sequelize/models";

const schemaPath = "src/schema/index.graphql";
const schemaLogin = "src/schema/indexLogin.graphql";

const { sequelize } = models;

sequelize.authenticate().then(() => {
	console.log(`Synchronizing database`);

	sequelize.sync().then(() => {
		console.log(`Synchronized database`);
	});

	const server = new ApolloServer({
		typeDefs: importSchema(schemaPath),
		resolvers,
		context,
	});
	server.listen( { port:5001 } ).then(({ url }) => {
		console.log(`Executando em ${url}`);
	});

	
	const serverAuth = new ApolloServer({
		typeDefs: importSchema(schemaLogin),
		resolversLogin,
	});

	serverAuth.listen( { port:5002 } ).then(({ url }) => {
		console.log(`Executando em ${url}`);
	});

});
