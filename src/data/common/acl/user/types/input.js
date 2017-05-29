import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});
