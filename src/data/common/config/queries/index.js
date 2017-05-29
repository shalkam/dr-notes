import find from './find.js';
import findOne from './find-one.js';
import { GraphQLObjectType } from 'graphql';

export default {
  config: {
    type: new GraphQLObjectType({ name: 'configQuery', fields: { find, findOne } })
  }
};
