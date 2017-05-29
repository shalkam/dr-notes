import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import node from '../interface.js';

export default { type: node, args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) } } };
