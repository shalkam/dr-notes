import { graphql } from 'graphql';
import schema from '../schema.js';

it('should be null when user is not logged in', async () => {
  const rootValue = {};
  const context = { req: {} };

  const result = await graphql(
    schema,
    `
    {
      checkedCar {
        find {
          _id
          carType
          title
        }
      }
    }
    `,
    rootValue,
    context
  );
  const { data } = result;
  console.log(data);
  expect(data.viewer.me).toBe(null);
});
