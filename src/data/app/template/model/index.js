import shortid from 'shortid';
import baseModel from '../../../common/base/model.js';

class modelIndex extends baseModel {
  insert(root, params, { req, db }, ast) {
    params.data.id = shortid.generate();
    let res;
    if (params.data.title === '')
      res = new Error('Title not found');
    else {
      res = db.getCollection('notes').insert(params.data);
    }
    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  async update(root, params, { req, db }, ast) {
    let res;
    if (params.data.title === '')
      res = new Error('Title not found');
    else {
      res = await new Promise(function(resolve, reject) {
        db.getCollection('notes').findAndUpdate({ id: params.data.id }, rec => {
          rec = Object.assign(rec, params.data);
          resolve(params.data);
          return rec;
        });
      });
    }

    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  async remove(root, params, { req, db }, ast) {
    this.handleFilesRemove(params.id);
    const remove = db.getCollection('templates').findAndRemove({ id: params.id });
    return true;
  }
  async removeAll(root, params, { req, db }, ast) {
    const removeAll = db.getCollection('templates').clear();
    return true;
  }
  find(root, params, { req, db }, ast) {
    let filter = params.filter ? params.filter : {};
    return db.getCollection('templates').find(filter);
  }
  findOne(root, params, { req, db }, ast) {
    return db.getCollection('templates').findOne({ id: params.id });
  }
}

export default new modelIndex();
