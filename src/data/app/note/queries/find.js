import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
// import NoteConnection from '../types/connection.js';
import type from '../types/index.js';

export default {
  type: new GraphQLList(type),
  args: {
    filter: { name: 'filter', type: GraphQLJSON },
    after: { name: 'after', type: GraphQLString },
    first: { name: 'after', type: GraphQLInt }
  }
};
