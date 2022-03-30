import React, { useCallback, useState } from 'react';
import axios from 'axios';

//components
import { UserInput } from '../UserInput';

//hooks
import { useUserContext } from 'hooks/useUserContext';

const DEFAULT_FORM_DATA = { userName: '', password: '' };

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Login = (): React.ReactElement => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [, setLoggedUser] = useUserContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    setFormData(prevData => ({ ...prevData, [inputId]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { userName, password } = formData;

      if (userName && password) {
        axios.post(`${BASE_URL}/getUser/withLoginInfo`, { userName, password }).then(res => {
          const resData = res.data;
          if (resData.status === 'success') {
            const { displayName, userId } = resData;
            setLoggedUser({ userId, displayName });
          }
          if (resData.status === 'user does not exist') {
            setError('user does not exist please try to SignUp');
          }
        });
      } else {
        setError('userName and password are required');
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
