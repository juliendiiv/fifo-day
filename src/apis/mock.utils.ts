import { ActionModel } from '../models/action.model';

export const mock: ActionModel[] = [
  {
    id: 0,
    name: 'Manger',
    maxCreditsPerDay: 12,
    userCredits: 8,
  },
  {
    id: 1,
    name: 'Dormir',
    maxCreditsPerDay: 20,
    userCredits: 8,
  },
  {
    id: 2,
    name: 'Coder',
    maxCreditsPerDay: 25,
    userCredits: 8,
  },
  {
    id: 3,
    name: 'Lire',
    maxCreditsPerDay: 10,
    userCredits: 8,
  },
];

export const LOCAL_STORAGE_KEY_ACTIONS = 'actions_mock_JRE';

export const randomCreditPercentage = () => Math.random() * 0.2 + 0.8;
export const getItemsStored = (key: string) => {
  const items = localStorage.getItem(key);

  return (items ? JSON.parse(items) : []) as any[];
};

export const storeItem = (key: string, item: any) => {
  const items = localStorage.getItem(key);

  if (!items) {
    localStorage.setItem(key, JSON.stringify([item]));
  } else {
    const oldItems = JSON.parse(items) as any[];
    localStorage.setItem(key, JSON.stringify([...oldItems, item]));
  }

  return item;
};

export const replaceItems = (key: string, newItems: any[]) => {
  localStorage.setItem(key, JSON.stringify(newItems));
};

export const getYesterdayTimestamp = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.getTime();
};
