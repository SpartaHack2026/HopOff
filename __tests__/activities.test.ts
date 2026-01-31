// __tests__/activities.test.ts
jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};

  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
        return Promise.resolve();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        store = {};
        return Promise.resolve();
      }),
    },
  };
});

import { ActivitiesService } from '../src/services/activity';

describe('ActivitiesService', () => {
  beforeEach(async () => {
    await ActivitiesService.clear();
  });

  test('adds and retrieves activities', async () => {
    await ActivitiesService.add('coloring', 'Hobby');
    await ActivitiesService.add('stretching', 'Movement');

    const activities = await ActivitiesService.get();

    expect(activities).toEqual({
      coloring: 'Hobby',
      stretching: 'Movement',
    });
  });

  test('removes an activity', async () => {
    await ActivitiesService.add('journaling', 'Productive');
    await ActivitiesService.remove('journaling');

    const activities = await ActivitiesService.get();
    expect(activities).toEqual({});
  });

  test('gets activities by category', async () => {
    await ActivitiesService.add('coloring', 'Hobby');
    await ActivitiesService.add('guitar', 'Hobby');
    await ActivitiesService.add('stretching', 'Movement');

    const hobbies = await ActivitiesService.getByCategory('Hobby');

    expect(hobbies).toContain('coloring');
    expect(hobbies).toContain('guitar');
    expect(hobbies).toHaveLength(2);
  });

  test('returns one random activity from category', async () => {
    await ActivitiesService.add('coloring', 'Hobby');
    await ActivitiesService.add('drawing', 'Hobby');

    const activity = await ActivitiesService.getRandomByCategory('Hobby');

    expect(['coloring', 'drawing']).toContain(activity?.name);
  });

  test('returns null when category is empty', async () => {
    const activity = await ActivitiesService.getRandomByCategory('Movement');
    expect(activity).toBeNull();
  });

  test('returns a random activity across all categories', async () => {
    await ActivitiesService.add('coloring', 'Hobby');
    await ActivitiesService.add('stretching', 'Movement');

    const random = await ActivitiesService.getRandom();

    expect(random).not.toBeNull();
    expect(['coloring', 'stretching']).toContain(random?.name);
  });
});
