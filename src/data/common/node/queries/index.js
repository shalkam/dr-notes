import find from './find.js';
import findOne from './find-one.js';
import { GraphQLObjectType } from 'graphql';

export default {
  car: {
    type: new GraphQLObjectType({ name: 'carQuery', fields: { find, findOne } })
  }
};
