import { GraphQLNonNull, GraphQLID } from 'graphql';

export default {
  type: GraphQLID,
  args: { role: { name: 'role', type: new GraphQLNonNull(GraphQLID) } }
};
