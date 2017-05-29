import find from './find.js';
import findOne from './find-one.js';
import { GraphQLObjectType } from 'graphql';

export default {
  note: {
    type: new GraphQLObjectType({ name: 'noteQuery', fields: { find, findOne } })
  }
};
