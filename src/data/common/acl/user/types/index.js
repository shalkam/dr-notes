import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString }
  }
});
