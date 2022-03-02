import {
  faForward,
  faHourglass,
  faSmileWink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ActionList from './components/ActionList';
import Queue from './components/Queue';
import { useAppDispatch } from './hooks';
import { resetQueue } from './slices/fifo.slice';

const App = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="mx-6">
        <h1 className="text-center text-4xl font-medium my-6">
          Les journées filent
        </h1>
        <div className="m-6 overflow-auto">
          <Queue />
        </div>

        <div className="justify-between flex mx-6">
          <span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Votre temps est compté, qu'allez-vous faire de votre journée ?
            <FontAwesomeIcon icon={faSmileWink} className="ml-1" />
            <FontAwesomeIcon icon={faHourglass} className="ml-1" />
          </span>
          <button type="button" onClick={() => dispatch(resetQueue())}>
            Finir la journée (ou attendez 24h)
            <FontAwesomeIcon icon={faForward} className="ml-2" />
          </button>
        </div>
      </div>
      <ActionList />
    </>
  );
};

export default App;
