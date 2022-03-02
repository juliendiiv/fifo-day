import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAppDispatch } from '../hooks';
import { createAction } from '../slices/fifo.slice';

interface FormValues {
  name: string;
  maxCreditsPerDay: number;
}

interface Props {
  onClose: () => void;
}

const ActionForm: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    name: '',
    maxCreditsPerDay: 30,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, '2 caractères min.')
      .max(50, '50 caractères max.')
      .required('Requis'),
    maxCreditsPerDay: Yup.number()
      .min(1, '1 minimum')
      .max(1000, '1000 max.')
      .required('Requis'),
  });

  return (
    <Formik
      validateOnChange
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(createAction(values));
        onClose();
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="bg-blue-500 flex flex-col p-6 rounded">
            <label className="text-white" htmlFor="name">
              Nom
            </label>
            <Field
              className="px-2 py-1 rounded"
              id="name"
              name="name"
              placeholder="Coder, manger, dormir..."
            />
            <div className="mb-2 text-white">{touched.name && errors.name}</div>

            <label className="text-white" htmlFor="maxCreditsPerDay">
              Crédits max. (par jour)
            </label>
            <Field
              className="px-2 py-1 rounded"
              id="maxCreditsPerDay"
              name="maxCreditsPerDay"
              placeholder="20"
              type="number"
            />
            <div className="mb-2 text-white">
              {touched.maxCreditsPerDay && errors.maxCreditsPerDay}
            </div>
          </div>
          <div className="flex mt-3 justify-around">
            <button
              type="submit"
              className="text-green-500 hover:text-green-600 cursor-pointer text-4xl flex"
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 hover:text-red-600 cursor-pointer text-4xl flex"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ActionForm;
