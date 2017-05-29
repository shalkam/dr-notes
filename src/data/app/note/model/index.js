import shortid from 'shortid';
import baseModel from '../../../common/base/model.js';

class modelIndex extends baseModel {
  insert(root, params, { req, db }, ast) {
    params.data.id = shortid.generate();
    if (params.data.files) {
      params.data.files = this.handleFiles(params.data.id, params.data.files);
    }
    let res = db.getCollection('notes').insert(params.data);
    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  async update(root, params, { req, db }, ast) {
    if (params.data.files) {
      params.data.files = this.handleFiles(params.data.id, params.data.files);
    }
    let res = await new Promise(function(resolve, reject) {
      db.getCollection('notes').findAndUpdate({ id: params.data.id }, rec => {
        rec = Object.assign(rec, params.data);
        resolve(params.data);
        return rec;
      });
    });

    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  async remove(root, params, { req, db }, ast) {
    this.handleFilesRemove(params.id);
    const remove = db.getCollection('notes').findAndRemove({ id: params.id });
    return true;
  }
  async removeAll(root, params, { req, db }, ast) {
    const removeAll = db.getCollection('notes').clear();
    return true;
  }
  find(root, params, { req, db }, ast) {
    let filter = params.filter ? params.filter : {};
    return db.getCollection('notes').find(filter);
  }
  findOne(root, params, { req, db }, ast) {
    return db.getCollection('notes').findOne({ id: params.id });
  }
}

export default new modelIndex();
