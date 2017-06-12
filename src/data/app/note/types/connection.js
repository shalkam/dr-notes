import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import NoteEdge from './edge.js';
import PageInfo from '../../../common/node/page-info.js';
import type from './index.js';

export default new GraphQLObjectType({
  name: 'NoteConnection',
  fields: {
    totalCount: { type: new GraphQLNonNull(GraphQLInt) },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
    edges: { type: new GraphQLList(NoteEdge) }
  }
});
