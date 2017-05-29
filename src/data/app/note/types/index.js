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
import file from './complex/file.js';
export default new GraphQLObjectType({
  name: 'note',
  fields: {
    // $loki: { type: GraphQLInt, description: 'Document ID provided by the database engine' },
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString), description: 'Note title' },
    content: { type: new GraphQLNonNull(GraphQLString), description: 'Note content' },
    files: { type: new GraphQLList(new GraphQLNonNull(file)) },
    meta: {
      type: new GraphQLObjectType({
        name: 'meta',
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
