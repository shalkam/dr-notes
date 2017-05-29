import {
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

export default new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  }
});
