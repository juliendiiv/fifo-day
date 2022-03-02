import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getActions,
  postAction,
  resetCreatedActions,
} from '../apis/action.api';
import {
  addAction,
  getQueue,
  removeFirstItemFromQueue,
  resetStoredQueue,
} from '../apis/queue.api';
import { ActionModel } from '../models/action.model';

export interface FifoState {
  actionsAvailable: ActionModel[];
  queue: { id: number; name: string }[];
}

const initialState: FifoState = {
  actionsAvailable: [],
  queue: [],
};

export const fetchActions = createAsyncThunk('actions/fetchAll', async () => {
  const actions = getActions();
  return actions;
});

export const createAction = createAsyncThunk(
  'actions/create',
  async (action: { name: string; maxCreditsPerDay: number }) => {
    const newActionCreated = postAction(action);
    return newActionCreated;
  },
);

export const fetchQueue = createAsyncThunk('queue/fetch', async () => {
  const queue = getQueue();
  return queue;
});

export const addActionInQueue = createAsyncThunk(
  'queue/addAction',
  async (action: { id: number; name: string }) => {
    const actionAdded = addAction(action);
    return actionAdded;
  },
);

export const resetQueue = createAsyncThunk('queue/reset', async () => {
  resetStoredQueue();
});

export const resetAll = createAsyncThunk('all/reset', async () => {
  resetCreatedActions();
  resetStoredQueue();
});

export const removeFirst = createAsyncThunk('queue/removeFirst', async () => {
  removeFirstItemFromQueue();
});

export const fifoSlice = createSlice({
  name: 'fifo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Les erreurs et les pending (tps de chargement) seraient à traiter en théorie */
    builder.addCase(fetchActions.fulfilled, (state, action) => {
      state.actionsAvailable = action.payload;
    });
    builder.addCase(createAction.fulfilled, (state, action) => {
      state.actionsAvailable.push(action.payload);
    });
    builder.addCase(fetchQueue.fulfilled, (state, action) => {
      state.queue = action.payload;
    });
    builder.addCase(addActionInQueue.fulfilled, (state, action) => {
      state.queue.push(action.payload);
    });
    builder.addCase(resetQueue.fulfilled, (state) => {
      state.queue = [];
    });
    builder.addCase(resetAll.fulfilled, (state) => {
      state.queue = [];
      state.actionsAvailable = [];
    });
    builder.addCase(removeFirst.fulfilled, (state) => {
      if (state.queue.length) {
        state.queue.shift();
      }
    });
  },
});

export default fifoSlice.reducer;
