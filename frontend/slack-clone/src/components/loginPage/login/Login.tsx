import React, { useCallback, useState } from 'react';
import axios from 'axios';

//components
import { UserInput } from '../UserInput';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//constants
import { LOGIN } from 'Constants';

//utils
import { getErrorMessage } from 'utils';

const DEFAULT_FORM_DATA = { userName: '', password: '' };

export const Login = (): React.ReactElement => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setLoggedUser] = useUserContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputId = e.target.id;
      const newFormData = { ...formData, [inputId]: e.target.value };
      setFormData(newFormData);

      // dynamic error handling
      if (isSubmitted) {
        const { userName, password } = newFormData;
        const errorMessage = getErrorMessage({ userName, password }, LOGIN);
        setError(errorMessage);
      }
    },
    [formData, isSubmitted]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);
      const { userName, password } = formData;

      if (userName && password) {
        axios
          .post(`getUser/withLoginInfo`, formData)
          .then(res => {
            const { status, userId, displayName } = res.data;
            if (status === 'success') {
              setLoggedUser({ userId, displayName });
            }
            if (status === 'user does not exist') {
              setError('user does not exist please try to SignUp');
            }
            if (status === 'incorrect password') {
              setError('incorrect password');
            }
          })
          .catch(err => {
            setError(err);
          });
      } else {
        const errorMessage = getErrorMessage({ userName, password }, LOGIN);
        setError(errorMessage);
      }
    },
    [formData, setLoggedUser]
  );
  return (
    <form onSubmit={handleSubmit}>
      <UserInput id="userName" onChange={handleChange} inputValue={formData.userName} isRequired />
      <UserInput id="password" onChange={handleChange} inputValue={formData.password} isRequired />
      <button className="submit-button" type="submit">
        Submit
      </button>
      {!!error && <h3 className="error">{error}</h3>}
    </form>
  );
};
