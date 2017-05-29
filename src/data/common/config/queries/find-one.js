import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import type from '../types/index.js';

export default { type: type, args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) } } };
