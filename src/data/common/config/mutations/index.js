import removeAll from './remove-all';
import remove from './remove';
import upsert from './upsert';
import { GraphQLObjectType } from 'graphql';

export default {
  config: {
    type: new GraphQLObjectType({
      name: 'configMutation',
      fields: { remove, removeAll, upsert }
    })
  }
};
