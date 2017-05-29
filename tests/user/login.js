import { graphql } from 'graphql';
import schema from '../schema.js';

it('should be null when user is not logged in', async () => {
  const rootValue = {};
  const context = { req: {} };

  const result = await graphql(
    schema,
    `
    mutation login {
      user {
        login(username: "test", password: "test") {
          username
          message
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
