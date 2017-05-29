import upsert from './upsert';
import remove from './remove.js';
import { GraphQLObjectType } from 'graphql';

export default {
  role: { type: new GraphQLObjectType({ name: 'roleMutation', fields: { upsert, remove } }) }
};
