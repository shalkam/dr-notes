import model from './model/index.js';
export default {
  templateMutation: {
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
  templateQuery: {
    find(root, params, context, ast) {
      return model.find(...arguments);
    },
    findOne(root, params, context, ast) {
      return model.findOne(...arguments);
    }
  }
};
