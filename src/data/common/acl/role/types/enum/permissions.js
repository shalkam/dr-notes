import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'permissionsEnum',
  values: {
    create: { value: 'create' },
    upsert: { value: 'upsert' },
    upsertOwn: { value: 'upsertOwn' },
    remove: { value: 'remove' },
    removeOwn: { value: 'removeOwn' },
    find: { value: 'find' },
    findOwn: { value: 'findOwn' },
    findOne: { value: 'findOne' },
    findOneOwn: { value: 'findOneOwn' },
    login: { value: 'login' },
    logout: { value: 'logout' },
    register: { value: 'register' },
    changePassword: { value: 'changePassword' },
    changeOwnPassword: { value: 'changeOwnPassword' },
    findRoles: { value: 'findRoles' },
    findOwnRoles: { value: 'findOwnRoles' },
    syncRoles: { value: 'syncRoles' },
    none: { value: 'none' }
  }
});
