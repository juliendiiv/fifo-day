import { ActionModel } from '../models/action.model';
import {
  getItemsStored,
  getYesterdayTimestamp,
  LOCAL_STORAGE_KEY_ACTIONS,
  randomCreditPercentage,
  replaceItems,
  storeItem,
} from './mock.utils';

// je simule ici ce qui devrait se passer dans le back end (stockage des données)

const LOCAL_STORAGE_KEY = 'queue_mock_JRE';
const LOCAL_STORAGE_KEY_TIMER = 'timer_mock_JRE';

export const resetStoredQueue = () => {
  replaceItems(LOCAL_STORAGE_KEY, []); // reset queue

  const actions: ActionModel[] = getItemsStored(LOCAL_STORAGE_KEY_ACTIONS);

  // recalculate credit
  replaceItems(
    LOCAL_STORAGE_KEY_ACTIONS,
    actions.map((action) => ({
      ...action,
      userCredits: Math.ceil(
        action.maxCreditsPerDay * randomCreditPercentage(),
      ),
    })),
  );
};

// imaginons des call à un back end...
// pour l'exemple les données sont persistées dans le localStorage
export const getQueue = () => {
  // reset la file toute les 24H
  const timer = localStorage.getItem(LOCAL_STORAGE_KEY_TIMER);

  if (!timer || +timer < getYesterdayTimestamp()) {
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMER, Date.now().toString());
    resetStoredQueue(); // recalcul les crédits aussi
  }

  const items: {
    id: number;
    name: string;
  }[] = getItemsStored(LOCAL_STORAGE_KEY);

  return items;
};

// ici on simule la création et le stockage back end en bdd (localStorage)
export const addAction = (actionToAdd: { id: number; name: string }) => {
  const item: {
    id: number;
    name: string;
  } = storeItem(LOCAL_STORAGE_KEY, actionToAdd);

  const actions: ActionModel[] = getItemsStored(LOCAL_STORAGE_KEY_ACTIONS);

  replaceItems(
    LOCAL_STORAGE_KEY_ACTIONS,
    actions.map((action) => {
      const isActionToEdit = action.id === actionToAdd.id;
      return isActionToEdit
        ? { ...action, userCredits: action.userCredits - 1 }
        : action;
    }),
  );

  return item;
};

export const removeFirstItemFromQueue = () => {
  const items: {
    id: number;
    name: string;
  }[] = getItemsStored(LOCAL_STORAGE_KEY);

  if (items.length) {
    // @ts-ignore
    replaceItems(LOCAL_STORAGE_KEY, items.slice(1));
  }
};
