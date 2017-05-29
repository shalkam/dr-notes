import passport from 'passport';
import shortid from 'shortid';
import baseModel from '../../../common/base/model.js';
import can from '../../acl/helpers/can.js';
import model from './model.js';

class modelIndex extends baseModel {
  async upsert(root, params, { req, acl }, ast) {
    const canUpsert = await can(req, acl, { resourceType: 'config', permission: 'upsert' });
    const canCreate = await can(req, acl, { resourceType: 'config', permission: 'create' });
    if (canUpsert === false && canCreate === false) throw new Error('Not Allowed');
    // tried to delegate this part to mongoose model but failed
    if (!params.data._id) {
      params.data._id = shortid.generate();
    }
    let res = model
      .findByIdAndUpdate(params.data._id, params.data, {
        new: true,
        upsert: canCreate,
        select: this.getProjection(ast)
      })
      .exec();

    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  async remove(root, params, { req, acl }, ast) {
    if ((await can(req, acl, { resourceType: 'config', permission: 'remove' })) !== true)
      throw new Error('Not Allowed');
    const projection = this.getProjection(ast);
    const removed = await model
      .findByIdAndRemove(params.id, { select: this.getProjection(ast) })
      .exec();

    if (!removed) {
      throw new Error('Error removing blog post');
    }
    return removed;
  }
  async removeAll(root, params, { req, acl }, ast) {
    if ((await can(req, acl, { resourceType: 'config', permission: 'removeAll' })) !== true)
      throw new Error('Not Allowed');
    const removed = await model.remove({}).exec();
    return removed;
  }
  async find(root, params, { req, acl, test }, ast) {
    if ((await can(req, acl, { resourceType: 'config', permission: 'find' })) !== true)
      throw new Error('Not Allowed');
    let filter = params.filter ? params.filter : {};
    return await model.find(filter).select(this.getProjection(ast)).exec();
  }
  async findOne(root, params, { req, acl }, ast) {
    if ((await can(req, acl, { resourceType: 'config', permission: 'findOne' })) !== true)
      throw new Error('Not Allowed');
    const res = await model.findById(params.id).select(this.getProjection(ast)).exec();
    return res;
  }
}

export default new modelIndex();
