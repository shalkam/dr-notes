import { GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';

export default {
  type: GraphQLBoolean,
  args: {
    id: { name: 'id', type: new GraphQLNonNull(GraphQLString) },
    password: { name: 'password', type: new GraphQLNonNull(GraphQLString) }
  }
};
