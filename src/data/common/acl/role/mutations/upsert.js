import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import type from '../types/index.js';
import input from '../types/input.js';
import model from '../model/index.js';

export default {
  type,
  args: { data: { name: 'data', type: new GraphQLNonNull(input) } },
  resolve(root, params, context, ast) {
    const upserted = model.upsert(...arguments);
    return upserted;
  }
};
