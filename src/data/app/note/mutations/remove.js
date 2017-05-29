import { GraphQLBoolean, GraphQLNonNull, GraphQLID } from 'graphql';
import type from '../types/index.js';

export default {
  type: GraphQLBoolean,
  args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) } }
};
