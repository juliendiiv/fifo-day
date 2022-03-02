import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchQueue, removeFirst } from '../slices/fifo.slice';

const Queue = () => {
  const { queue } = useAppSelector((state) => state.fifo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQueue());
  }, []);

  return (
    <>
      {queue?.length > 0 && (
        <button
          type="button"
          className="flex flex-col items-center w-40 mb-2 bg-red-300 p-2 rounded"
          onClick={() => dispatch(removeFirst())}
        >
          Enlever
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      )}
      <div className="flex">
        {queue.map((action, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="bg-blue-200 p-4 rounded mr-2 mb-2 h-28 flex items-center justify-center text-center shrink-0 w-40"
          >
            <span className="break-words w-full">{action.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Queue;
