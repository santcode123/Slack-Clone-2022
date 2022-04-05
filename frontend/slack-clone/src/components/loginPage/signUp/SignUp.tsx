import React, { useCallback, useState } from 'react';
import axios from 'axios';

//components
import { UserInput } from '../UserInput';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//utils
import { getErrorMessage } from 'utils';

//constants
import { SIGN_UP } from 'Constants';

//types
import { UserType } from 'types';

const DEFAULT_FORM_DATA = { firstName: '', lastName: '', userName: '', password: '' };

export const SignUp = (): React.ReactElement => {
  const [formData, setFormData] = useState<Omit<UserType, 'directMessages' | 'channels'>>(DEFAULT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setLoggedUser] = useUserContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputId = e.target.id;
      const newFormData = { ...formData, [inputId]: e.target.value };
      setFormData(newFormData);
      if (isSubmitted) {
        const { userName, password, firstName } = newFormData;
        const errorMessage = getErrorMessage({ userName, password, firstName }, SIGN_UP);
        setError(errorMessage);
      }
    },
    [formData, isSubmitted]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);
      const { firstName, userName, password } = formData;

      if (userName && password && firstName) {
        axios
          .post('/addUser', formData)
          .then(res => {
            const { status, userId, displayName } = res.data;
            if (status === 'success') {
              setLoggedUser({ userId, displayName });
            }
            if (status === 'exists') {
              setError('this user already exists please try to login');
            }
          })
          .catch(err => {
            setError(err);
          });
      } else {
        const errorMessage = getErrorMessage({ firstName, userName, password }, SIGN_UP);
        setError(errorMessage);
      }
    },
    [formData, setLoggedUser]
  );
  return (
    <form onSubmit={handleSubmit}>
      <UserInput id="firstName" onChange={handleChange} inputValue={formData.firstName} isRequired />
      <UserInput id="lastName" onChange={handleChange} inputValue={formData.lastName} />
      <UserInput id="userName" onChange={handleChange} inputValue={formData.userName} isRequired />
      <UserInput id="password" onChange={handleChange} inputValue={formData.password} isRequired />
      <button className="submit-button" type="submit">
        Submit
      </button>
      {!!error && <h3 className="error">{error}</h3>}
    </form>
  );
};
