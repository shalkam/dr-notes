import model from './model/index.js';
export default {
  noteMutation: {
    removeAll(root, params, context, ast) {
      return model.removeAll(...arguments);
    },
    remove(root, params, context, ast) {
      return model.remove(...arguments);
    },
    insert(root, params, context, ast) {
      return model.insert(...arguments);
    },
    update(root, params, context, ast) {
      return model.update(...arguments);
    }
  },
  noteQuery: {
    find(root, params, context, ast) {
      return model.find(...arguments);
    },
    findOne(root, params, context, ast) {
      return model.findOne(...arguments);
    }
  }
};
