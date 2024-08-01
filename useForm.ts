import { SyntheticEvent, useEffect, useState } from "react";
import { InitialFormType, FormControlObjectType } from "../utilities/formTypes";

export const useForm = (initialForm: InitialFormType) => {
  const [form, setForm] = useState(() => {
    let initialState: FormControlObjectType = {};
    for (const key in initialForm) {
      const [initialValue, ...validators] = initialForm[key];
      initialState = {
        ...initialState,
        [key]: {
          value: initialValue,
          validators: validators,
          touched: validators.some(validateFn => validateFn.name == 'notRequired'),
          error: false,
          name: key,
          valid: false
        },
      };
    }
    return initialState;
  });

  const [error, setError] = useState(false);

  const [touched, setTouched] = useState(false);

  const [valid, setValid] = useState(false);

  const [currentControl, setCurrentControl] = useState("");

  const inValid = !valid

  useEffect(() => {
    setFormValidity()
  }, [form]);

  const setFormValidity = () => {
    let error = 0;
    let notTouched = 0;
    for (let key in form) {
      if (form[key].error) {
        error += 1;
      }
      if (!form[key].touched) {
        notTouched += 1;
      }
    }
    setError(error != 0);
    setTouched(notTouched == 0);
    setValid(!(error != 0) && notTouched == 0);
  }

  const handleInput = (e: SyntheticEvent) => {
    let input = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    let controlName = input.name;
    setCurrentControl(controlName);
    let error = 0;
    console.log(input.value)
    if (form[controlName].validators.length != 0) {
      for (let validateFn of form[controlName].validators) {
        if (!validateFn(input.value)) {
          error += 1;
        }
      }
    }
    setForm((currentState) => {
      currentState = {
        ...currentState,
        [controlName]: {
          ...currentState[controlName],
          value: input.value,
          error: error != 0,
          touched: true,
          valid : !(error != 0) && true
        },
      };
      return currentState;
    });
  };

  const get = (name: string) => form[name];

  const hasError = (name: string) => form[name].error;

  const hasTouched = (name: string) => form[name].touched;

  const set = (name: string, value: any) => {
    setForm((currentState) => {
      currentState = {
        ...currentState,
        [name]: {
          ...currentState[name],
          value: value,
        },
      };
      return currentState;
    });
  };

  const value = () => {
    let value = {};
    for (let controlObjectKey in form) {
      value = {
        ...value,
        [controlObjectKey]: form[controlObjectKey].value,
      };
    }
    return value;
  };

  return {
    form,
    handleInput,
    get,
    set,
    error,
    hasError,
    touched,
    hasTouched,
    value,
    currentControl,
    valid,
    inValid
  };
};
