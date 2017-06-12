import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import type from './index.js';

export default new GraphQLObjectType({
  name: 'NoteEdge',
  fields: {
    node: { type },
    cursor: { type: new GraphQLNonNull(GraphQLString) }
  }
});
