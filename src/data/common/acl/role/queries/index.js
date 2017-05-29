import findOne from './find-one.js';
import find from './find.js';
import { GraphQLObjectType } from 'graphql';

export default {
  role: { type: new GraphQLObjectType({ name: 'roleQuery', fields: { find, findOne } }) }
};
