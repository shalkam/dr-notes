import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';

export default {
  type: new GraphQLObjectType({
    name: 'syncRoles',
    fields: {
      id: { type: GraphQLString },
      roles: { type: new GraphQLList(GraphQLString) }
    }
  }),
  args: {
    id: { name: 'id', type: new GraphQLNonNull(GraphQLString) },
    roles: { name: 'roles', type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  }
};
