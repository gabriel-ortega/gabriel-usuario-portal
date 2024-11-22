import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) {
        return false;
      }
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
    setUnsavedChanges(true);
  };

  const onSelectCountryChange = (e, name) => {
    setFormState({
      ...formState,
      [name]: e,
    });
    setUnsavedChanges(true);
  };

  const onSelectPhoneChange = (e, name = "phone") => {
    const { data, value } = e;
    setFormState({
      ...formState,
      [name]: { data, value },
    });
    setUnsavedChanges(true);
  };

  const onSelectChange = (e, inputName) => {
    const selectedValue = e[0];
    const { id, name } = selectedValue;
    setFormState({
      ...formState,
      [inputName]: { id, name },
    });
    setUnsavedChanges(true);
  };

  const onRatingChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setUnsavedChanges(false);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    unsavedChanges,
    onInputChange,
    onResetForm,
    onSelectCountryChange,
    onSelectPhoneChange,
    onSelectChange,
    onRatingChange,

    ...formValidation,
    isFormValid,
  };
};
