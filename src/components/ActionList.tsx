import { faCirclePlus, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addActionInQueue, fetchActions, resetAll } from '../slices/fifo.slice';
import ActionForm from './ActionForm';

const ActionList = () => {
  const { actionsAvailable, queue } = useAppSelector((state) => state.fifo);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchActions());
  }, [queue]);

  return (
    <div className="px-6 flex flex-wrap">
      <div className="flex justify-center items-start mt-6">
        <div className="flex items-center flex-col">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 cursor-pointer text-4xl flex mt-6 mx-6"
            onClick={() => setShowForm(!showForm)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 cursor-pointer flex mt-6 mx-6"
            onClick={() => dispatch(resetAll())}
          >
            Réinitialiser
          </button>
        </div>

        {showForm && <ActionForm onClose={() => setShowForm(false)} />}
      </div>
      <div className="flex flex-wrap flex-1">
        {/* Todo : move in ActionCard (or ActionButton) */}
        {actionsAvailable.map((action) => (
          <button
            type="button"
            onClick={() => dispatch(addActionInQueue(action))}
            disabled={action.userCredits <= -action.maxCreditsPerDay}
            key={action.id}
            className="ml-6 mt-6 bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 disabled:bg-blue-900 rounded"
          >
            <div className="w-48 h-32 flex flex-col justify-between items-center p-4">
              <div className="text-lg font-medium inline-block break-words w-full">
                {action.userCredits <= -action.maxCreditsPerDay
                  ? `Vous n'allez pas passer la journée à ${action.name} ? :o`
                  : action.name}
              </div>

              {action.userCredits > -action.maxCreditsPerDay && (
                <div className="text-right w-full">
                  {`${action.userCredits} / ${action.maxCreditsPerDay}`}
                  <FontAwesomeIcon icon={faCoins} className="ml-2" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionList;
