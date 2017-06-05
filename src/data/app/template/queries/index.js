import find from './find.js';
import findOne from './find-one.js';
import { GraphQLObjectType } from 'graphql';

export default {
  template: {
    type: new GraphQLObjectType({ name: 'templateQuery', fields: { find, findOne } })
  }
};
