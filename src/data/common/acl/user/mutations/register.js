import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import input from '../types/input.js';
import type from '../types/index.js';

export default {
  type,
  args: { data: { name: 'data', type: new GraphQLNonNull(input) } }
};
