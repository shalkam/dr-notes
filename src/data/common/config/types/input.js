import { GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
export default new GraphQLInputObjectType({
  name: 'configInput',
  fields: {
    _id: { type: GraphQLID },
    key: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLString }
  }
});
