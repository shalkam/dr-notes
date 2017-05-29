import model from './model/index.js';

export default {
  userMutation: {
    login(root, params, context, ast) {
      return model.login(...arguments);
    },
    logout(root, params, context, ast) {
      return model.logout(...arguments);
    },
    register(root, params, context, ast) {
      return model.register(...arguments);
    },
    syncRoles(root, params, context, ast) {
      return model.syncRoles(...arguments);
    },
    changePassword(root, params, context, ast) {
      return model.changePassword(...arguments);
    }
  },
  userQuery: {
    find(root, params, context, ast) {
      return model.find(...arguments);
    },
    findOne(root, params, context, ast) {
      return model.findOne(...arguments);
    },
    findRoles(root, params, context, ast) {
      return model.findRoles(...arguments);
    }
  }
};
