import { GraphQLInputObjectType, GraphQLEnumType, GraphQLString, GraphQLList } from 'graphql';
import resourcesEnum from './enum/resources.js';
import permissionsEnum from './enum/permissions.js';

export default new GraphQLInputObjectType({
  name: 'roleInput',
  fields: {
    roles: { type: GraphQLString },
    allows: {
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'resourcesInput',
        fields: {
          resources: { type: new GraphQLList(resourcesEnum) },
          permissions: { type: new GraphQLList(permissionsEnum) }
        }
      }))
    }
  }
});
