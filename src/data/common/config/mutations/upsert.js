import { GraphQLNonNull, GraphQLID } from 'graphql';
import type from '../types/index.js';
import typeInput from '../types/input.js';

export default { type, args: { data: { name: 'data', type: new GraphQLNonNull(typeInput) } } };
