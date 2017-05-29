import { GraphQLList } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import type from '../types/index.js';

export default {
  type: new GraphQLList(type),
  args: { filter: { name: 'filter', type: GraphQLJSON } }
};
