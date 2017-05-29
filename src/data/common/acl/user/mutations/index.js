import login from './login.js';
import logout from './logout.js';
import upsert from './upsert.js';
import register from './register.js';
import changePassword from './change-password.js';
import syncRoles from './sync-roles.js';
import { GraphQLObjectType } from 'graphql';

export default {
  user: {
    type: new GraphQLObjectType({
      name: 'userMutation',
      fields: { login, logout, register, upsert, syncRoles, changePassword }
    })
  }
};
