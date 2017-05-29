import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';

export default {
  type: new GraphQLObjectType({
    name: 'login',
    fields: { token: { type: GraphQLString }, message: { type: GraphQLString } }
  }),
  args: {
    username: { name: 'username', type: GraphQLString },
    password: { name: 'password', type: GraphQLString }
  }
};
