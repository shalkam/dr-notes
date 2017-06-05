import note from './app/note/resolvers.js';
import template from './app/template/resolvers.js';

import {
  // GraphQLEmail,
  GraphQLURL,
  // GraphQLLimitedString,
  // GraphQLPassword,
  // GraphQLUUID
  GraphQLDateTime
} from 'graphql-custom-types';

export default {
  ...note,
  ...template,
  Query: {
    note: () => true,
    template: () => true
  },
  Mutation: {
    note: () => true,
    template: () => true
  }
};
