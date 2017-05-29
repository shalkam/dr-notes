import { GraphQLList } from 'graphql';
import type from '../types/index.js';

export default { type: new GraphQLList(type), args: {} };
