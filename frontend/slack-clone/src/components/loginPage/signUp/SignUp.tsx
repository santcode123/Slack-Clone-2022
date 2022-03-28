import React, { useCallback, useState } from 'react';
import axios from 'axios';

//components
import { UserInput } from '../UserInput';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//types
import { UserType } from 'types';

const DEFAULT_FORM_DATA = { firstName: '', lastName: '', userName: '', password: '' };

export const SignUp = (): React.ReactElement => {
  const [formData, setFormData] = useState<Omit<UserType, 'directUsers' | 'channels'>>(DEFAULT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [, setLoggedUser] = useUserContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    setFormData(prevData => ({ ...prevData, [inputId]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { firstName, userName, password } = formData;

      if (userName && password && firstName) {
        axios
          .post('/addUser', formData)
          .then(res => {
            if (res.data.status === 'success') {
              const { userId, displayName } = res.data;
              setLoggedUser({ userId, displayName });
            }
            if (res.data.status === 'exists') {
              setError('this user already exists please try to login');
            }
          })
          .catch(err => {
            setError(`there is an error while adding user to backend in signUp process`);
          });
      } else {
        setError('firstName, userName and password are required');
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
