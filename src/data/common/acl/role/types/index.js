import { GraphQLObjectType, GraphQLEnumType, GraphQLString, GraphQLList } from 'graphql';
import resourcesEnum from './enum/resources.js';
import permissionsEnum from './enum/permissions.js';

export default new GraphQLObjectType({
  name: 'role',
  fields: {
    roles: { type: GraphQLString },
    allows: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'allows',
        fields: {
          resources: { type: new GraphQLList(resourcesEnum) },
          permissions: { type: new GraphQLList(permissionsEnum) }
        }
      }))
    }
  }
});
