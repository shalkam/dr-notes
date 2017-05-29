import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'resourcesEnum',
  values: {
    newCar: { value: 'newCar' },
    usedCar: { value: 'usedCar' },
    checkedCar: { value: 'checkedCar' },
    role: { value: 'role' },
    user: { value: 'user' },
    config: { value: 'config' }
  }
});
