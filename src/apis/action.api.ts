import { ActionModel } from '../models/action.model';
import {
  getItemsStored,
  LOCAL_STORAGE_KEY_ACTIONS,
  mock,
  randomCreditPercentage,
  replaceItems,
  storeItem,
} from './mock.utils';

// je simule ici ce qui devrait se passer dans le back end (stockage des données)

export const resetCreatedActions = () => {
  replaceItems(LOCAL_STORAGE_KEY_ACTIONS, []);
};

// imaginons des call à un back end...
// pour l'exemple les données sont persistées dans le localStorage
export const getActions = () => {
  let actions: ActionModel[] = getItemsStored(LOCAL_STORAGE_KEY_ACTIONS);

  if (actions.length === 0) {
    replaceItems(LOCAL_STORAGE_KEY_ACTIONS, mock);
    actions = [...mock];
  }

  return actions;
};

// ici on simule la création et le stockage back end en bdd (localStorage)
export const postAction = (action: {
  name: string;
  maxCreditsPerDay: number;
}) => {
  const actions: ActionModel[] = getItemsStored(LOCAL_STORAGE_KEY_ACTIONS);

  const newAction: ActionModel = {
    ...action,
    id: actions.length ? actions[actions.length - 1].id + 1 : 0,
    userCredits: Math.ceil(action.maxCreditsPerDay * randomCreditPercentage()),
  };

  storeItem(LOCAL_STORAGE_KEY_ACTIONS, newAction);

  return newAction;
};
