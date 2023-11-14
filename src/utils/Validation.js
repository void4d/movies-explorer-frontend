import { useState, useCallback, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export function useFormWithValidation() {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // const usernamePattern = /^[a-zA-Zа-яА-ЯЁё\s-]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name === 'username') {
      if (value === '') {
        target.setCustomValidity('');
      } else if (target.validity.patternMismatch) {
        target.setCustomValidity('Имя пользователя может содержать только латиницу, кириллицу, дефисы и пробелы');
      } else {
        target.setCustomValidity('');
      }
    }

    if (name === 'email') {
      if (!emailPattern.test(value)) {
        setIsValid(false);
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    if (!value || currentUser.name === value || currentUser.email === value) {
      setIsValid(false);
    } else {
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors };
}
