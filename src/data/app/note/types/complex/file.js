import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'file',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    size: { type: new GraphQLNonNull(GraphQLInt) },
    path: { type: new GraphQLNonNull(GraphQLString) }
  }
});
