import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import queries from '../src/data/queries';
import mutations from '../src/data/mutations';
import resolvers from '../src/data/resolvers.js';
import { addResolveFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
let gqlSchema;
gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({ name: 'Query', fields: queries }),
  mutation: new GraphQLObjectType({ name: 'Mutation', fields: mutations })
});
addResolveFunctionsToSchema(gqlSchema, resolvers);
export default gqlSchema;
