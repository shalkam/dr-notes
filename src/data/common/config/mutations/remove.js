import { GraphQLNonNull, GraphQLID } from 'graphql';
import type from '../types/index.js';

export default { type, args: { id: { name: 'id', type: new GraphQLNonNull(GraphQLID) } } };
