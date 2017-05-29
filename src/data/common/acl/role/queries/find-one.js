import { GraphQLID, GraphQLNonNull } from 'graphql';
import type from '../types/index.js';

export default {
  type: type,
  args: { role: { name: 'role', type: new GraphQLNonNull(GraphQLID) } }
};
