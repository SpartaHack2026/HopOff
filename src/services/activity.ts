import AsyncStorage from '@react-native-async-storage/async-storage';

export type ActivityCategory = 'Hobby' | 'Productive' | 'Movement';

export type Activities = Record<string, ActivityCategory>;

const KEY = 'user_activities';

const getAll = async (): Promise<Activities> => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
};

export const ActivitiesService = {
  async get(): Promise<Activities> {
    return getAll();
  },

  //get activities by category
  //const hobbies = await ActivitiesService.getByCategory('Hobby');
  async getByCategory(category: ActivityCategory): Promise<string[]> {
    const activities = await getAll();

    return Object.entries(activities)
      .filter(([, value]) => value === category)
      .map(([name]) => name);
  },

  // add a new activity
  //await ActivitiesService.add('stretching', 'Movement');
  async add(name: string, category: ActivityCategory) {
    const current = await getAll();
    const next = { ...current, [name]: category };
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  },

  // remove an activity
  //await ActivitiesService.remove('stretching');
  async remove(name: string) {
    const current = await getAll();
    const { [name]: _, ...rest } = current;
    await AsyncStorage.setItem(KEY, JSON.stringify(rest));
  },

  // clear all activities
  //await ActivitiesService.clear();
  async clear() {
    await AsyncStorage.removeItem(KEY);
  },

  // get a random activity
  //const activity = await ActivitiesService.getRandom();
  async getRandom(): Promise<{
    name: string;
    category: ActivityCategory;
  } | null> {
    const entries = Object.entries(await getAll());
    if (entries.length === 0) return null;

    const [name, category] =
      entries[Math.floor(Math.random() * entries.length)];

    return { name, category };
  },

  //get a random activity by category
  //const activity = await ActivitiesService.getRandomByCategory('Hobby');
  async getRandomByCategory(category: ActivityCategory): Promise<{
    name: string;
    category: ActivityCategory;
  } | null> {
    const activities = await this.getByCategory(category);

    if (activities.length === 0) return null;

    const name = activities[Math.floor(Math.random() * activities.length)];

    return { name, category };
  },
};
