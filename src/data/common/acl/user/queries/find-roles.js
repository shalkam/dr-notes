import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import type from '../types/index.js';

export default {
  type: new GraphQLList(GraphQLID),
  args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) } }
};
