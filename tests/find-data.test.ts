import { findData } from '../find-data';

describe('findData function test suite', () => {
  test('combined not embedded objects', () => {
    const input1: Record<string, string | number | Record<string, string | number>>[] = [
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
    const input2: Record<string, string | number>[] = [
      {
        id: 1,
        city: 'Gliwice',
      },
    ];

    const output: (Record<string, string | number> |
    Record<string, string | number | Record<string, string | number>>)[] = findData(
      input1,
      input2,
    );

    expect(output)
      .toMatchSnapshot();
  });
  test('combined embedded objects and not embedded objects', () => {
    const input1: Record<string, string | number | Record<string, string | number>>[] = [
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
    const input2: Record<string, string | { id: number; name: string; }[]>[] = [
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

    const output: (Record<string, string | number |
    Record<string, string | number>> |
    Record<string, string | { id: number, name: string }[]>)[] = findData(input1, input2);

    expect(output)
      .toMatchSnapshot();
  });
});
