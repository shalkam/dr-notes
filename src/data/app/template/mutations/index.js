import removeAll from './remove-all';
import remove from './remove';
import update from './update';
import insert from './insert';
import { GraphQLObjectType } from 'graphql';

export default {
  template: {
    type: new GraphQLObjectType({
      name: 'templateMutation',
      fields: { remove, removeAll, insert, update }
    })
  }
};
