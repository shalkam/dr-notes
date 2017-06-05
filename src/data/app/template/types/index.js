import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
export default new GraphQLObjectType({
  name: 'template',
  fields: {
    // $loki: { type: GraphQLInt, description: 'Document ID provided by the database engine' },
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString), description: 'Note title' },
    content: { type: new GraphQLNonNull(GraphQLString), description: 'Note content' },
    meta: {
      type: new GraphQLObjectType({
        name: 'metaTemplate',
        fields: {
          created: {
            type: GraphQLString,
            description: 'Date document created in timestamp'
          }
        }
      })
    }
  }
});
