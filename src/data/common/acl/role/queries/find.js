import { GraphQLID, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';

export default { type: new GraphQLList(GraphQLString) };
