import note from './app/note/resolvers.js';

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
  Query: {
    note: () => true
  },
  Mutation: {
    note: () => true
  }
};
