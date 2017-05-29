import { GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'configFilter',
  fields: {
    _id: { type: GraphQLID },
    key: { type: GraphQLString },
    value: { type: GraphQLString }
  }
});
