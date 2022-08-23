import { findData } from '../find-data';

describe('findData function test suite', () => {
  test('combined not embedded objects', () => {
    const input1: ({ id: number, name: string } | {
      name: string;
      surname: string;
      animal: {
        name: string;
        age: number;
      }
    })[] = [
      {
        id: 1,
        name: 'Grzegorz',
      },
      {
        name: 'Grzegorz',
        surname: 'NieGrzegorz',
        animal: {
          name: 'Czarny',
          age: 1,
        },
      }];
    const input2: {
      id: number;
      city: string;
    }[] = [
      {
        id: 1,
        city: 'Gliwice',
      },
    ];

    const output: ({ id: number, name: string }
    | { name: string, surname: string, animal: { name: string, age: number } }
    | { id: number, city: string })[] = findData<{
      id: number;
      name: string;
    } | {
      name: string;
      surname: string;
      animal: {
        name: string;
        age: number;
      };
    }, {
      id: number;
      city: string;
    }>(
      input1,
      input2,
    );

    expect(output)
      .toMatchSnapshot();
  });
  test('combined embedded objects and not embedded objects', () => {
    const input1: ({ id: number, name: string } |
    { name: string, surname: string, animal: { name: string, age: number } }
    | { id: number, city: string } | { age: number, color: string })[] = [
      {
        id: 1,
        name: 'Grzegorz',
      },
      {
        name: 'Grzegorz',
        surname: 'NieGrzegorz',
        animal: {
          name: 'Czarny',
          age: 1,
        },
      },
      {
        id: 1,
        city: 'Gliwice',
      },
      {
        age: 1,
        color: 'Black',
      }];
    const input2: ({ friends: { id: number, name: string }[] }
    | { name: string, lastName: string })[] = [
      {
        friends: [
          {
            id: 1241,
            name: 'Adam',
          }],
      },
      {
        name: 'Adam',
        lastName: 'NieAdam',
      }];

    const output: ({ id: number, name: string }
    | { name: string, surname: string, animal: { name: string, age: number } }
    | { id: number, city: string } | { age: number, color: string }
    | { friends: { id: number, name: string }[] }
    | { name: string, lastName: string })[] = findData<{
      id: number;
      name: string;
    } | {
      name: string;
      surname: string;
      animal: {
        name: string;
        age: number;
      };
    } | {
      id: number;
      city: string;
    } | {
      age: number;
      color: string;
    }, {
      friends: {
        id: number;
        name: string;
      }[];
    } | {
      name: string;
      lastName: string;
    }>(input1, input2);

    expect(output)
      .toMatchSnapshot();
  });
});
