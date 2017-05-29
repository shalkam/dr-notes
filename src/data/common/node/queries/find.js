import { GraphQLList } from 'graphql';
import car from '../interface.js';
import GraphQLJSON from 'graphql-type-json';
export default {
  type: new GraphQLList(car),
  args: { filter: { name: 'filter', type: GraphQLJSON } }
};
