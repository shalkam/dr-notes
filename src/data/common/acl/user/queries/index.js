import find from './find.js';
import findOne from './find-one.js';
import findRoles from './find-roles.js';
import { GraphQLObjectType } from 'graphql';

export default {
  user: {
    type: new GraphQLObjectType({
      name: 'userQuery',
      fields: { find, findOne, findRoles }
    })
  }
};
