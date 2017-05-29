import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import index from './index.js';
import file from './complex/file-input.js';
let fields = Object.assign({}, index._typeConfig.fields);
fields.files = { type: new GraphQLList(new GraphQLNonNull(file)) };
fields.meta = {
  type: new GraphQLInputObjectType({
    name: 'metaInput',
    fields: {
      created: {
        type: GraphQLInt,
        description: 'Date document created in timestamp'
      }
    }
  })
};

export default new GraphQLInputObjectType({
  name: 'noteInput',
  fields
});
