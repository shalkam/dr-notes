import { graphql } from 'graphql';
import { connection } from '../mongooseConnection.js';
import acl from 'acl';
import schema from '../schema.js';

export default it('find admin role should return admin role', async () => {
  const aclInstance = await new Promise((resolve, reject) => {
    connection.on('connected', function(error) {
      if (error) reject(error);
      const aclInstance = new acl(new acl.mongodbBackend(connection.db, 'acl_'));
      resolve(aclInstance);
    });
  });
  const rootValue = {};
  const context = { req: {}, acl: aclInstance };
  const variables = { data: { role: 'admin', resources: [ 'newCar' ], permissions: [ 'list' ] } };
  const result = await graphql(
    schema,
    `
    {
      role {
        findOne(role: "admin") {
          role
          resources {
            resource
            permissions
          }
        }
      }
    }
    `,
    rootValue,
    context,
    variables
  );
  const { data, errors } = result;
  expect(data.role.findOne.role).toEqual('admin');
  expect(errors).not.toBeDefined();
  // expect(data).toHaveProperty('role.upsert');
  // expect(data).toHaveProperty('role.upsert.role', 'admin');
  // expect(data).toHaveProperty('role.upsert.resources');
});
