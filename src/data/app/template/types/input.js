import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import index from './index.js';
let fields = Object.assign({}, index._typeConfig.fields);
fields.meta = {
  type: new GraphQLInputObjectType({
    name: 'metaTemplateInput',
    fields: {
      created: {
        type: GraphQLInt,
        description: 'Date document created in timestamp'
      }
    }
  })
};

export default new GraphQLInputObjectType({
  name: 'templateInput',
  fields
});
