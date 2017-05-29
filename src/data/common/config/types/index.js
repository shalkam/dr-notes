import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'config',
  fields: {
    _id: { type: GraphQLID },
    key: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLString }
  }
});
