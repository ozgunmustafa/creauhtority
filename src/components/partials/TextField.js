import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { useTranslation } from 'react-i18next';

export const TextField = ({ label, ...props }) => {
  const { t } = useTranslation();

  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={field.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={field.name}
        className="form-input"
        {...field}
        {...props}
        required
      />
      <ErrorMessage
        component="small"
        name={field.name}
        className="text-red-600"
      />
    </>
  );
};
