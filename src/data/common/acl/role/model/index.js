import querystring from 'querystring';
import passport from 'passport';
import shortid from 'shortid';
import baseModel from '../../../base/model.js';
import can from '../../helpers/can.js';
// import model from './model.js';
class modelIndex extends baseModel {
  async upsert(root, params, { acl, req }, ast) {
    // const canCreate = await can(req, acl, { resourceType: 'role', permission: 'create' });
    if ((await can(req, acl, { resourceType: 'role', permission: 'upsert' })) === false)
      throw new Error('Not Allowed');
    // remove previous role/permissions first
    await new Promise((resolve, reject) => {
      acl.removeRole(params.data.roles, err => {
        if (err) reject(err);
        resolve(params.data.roles);
      });
    });
    //then add the new one
    return await new Promise(function(resolve, reject) {
      acl.allow([params.data], err => {
        if (err) {
          reject(new Error(err));
        } else {
          acl.whatResources(params.data.roles, (err, resources) => {
            let result = { roles: params.data.roles, allows: [] };
            Object.keys(resources).map(item => {
              result.allows.push({ resources: [item], permissions: resources[item] });
            });
            resolve(result);
          });
        }
      });
    });
  }
  async remove(root, params, { acl, req }, ast) {
    if ((await can(req, acl, { resourceType: 'role', permission: 'remove' })) === false)
      throw new Error('Not Allowed');
    return await new Promise((resolve, reject) => {
      acl.removeRole(params.role, err => {
        if (err) reject(err);
        resolve(params.role);
      });
    });
  }
  async findOne(root, params, { acl, req }, ast) {
    if ((await can(req, acl, { resourceType: 'role', permission: 'findOne' })) === false)
      throw new Error('Not Allowed');
    return await new Promise(function(resolve, reject) {
      acl.whatResources(params.role, (err, resources) => {
        if (err) reject(new Error(err));
        let result = { roles: [params.role], allows: [] };
        Object.keys(resources).map(item => {
          result.allows.push({ resources: [item], permissions: resources[item] });
        });
        resolve(result);
      });
    });
  }
  async find(root, params, { acl, req }, ast) {
    if ((await can(req, acl, { resourceType: 'role', permission: 'find' })) === false)
      throw new Error('Not Allowed');
    return await new Promise((resolve, reject) => {
      acl.backend.db.collection('acl_' + acl.options.buckets.meta, (err, collection) => {
        collection.findOne({ key: 'roles' }).then(result => {
          let roles = [];
          Object.keys(result).map(role => {
            if (role !== '_id' && role !== 'key') {
              roles.push(role);
            }
          });
          resolve(roles);
        });
      });
    });
  }
}

export default new modelIndex();
