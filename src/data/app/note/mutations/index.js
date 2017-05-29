import removeAll from './remove-all';
import remove from './remove';
import update from './update';
import insert from './insert';
import { GraphQLObjectType } from 'graphql';

export default {
  note: {
    type: new GraphQLObjectType({
      name: 'noteMutation',
      fields: { remove, removeAll, insert, update }
    })
  }
};
