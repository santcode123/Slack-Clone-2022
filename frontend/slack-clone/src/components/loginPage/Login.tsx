import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from 'hooks/useUserContext';

const DEFAULT_FORM_DATA = { userName: '', password: '' };
export const Login = (): React.ReactElement => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [, setLoggedUser] = useUserContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputId = e.target.id;
    setFormData(prevData => ({ ...prevData, [inputId]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { userName, password } = formData;
    if (!userName) {
      setError(`please enter username`);
    }
    if (!password) {
      setError('please enter password');
    }
    const userId = formData.userName + '-' + formData.password;

    if (userName && password) {
      axios.get(`user/${userId}`).then(res => {
        const user = res.data;

        if (user) {
          setLoggedUser(userId);
        } else {
          setError(`user "${userName}" does not exist please signUp `);
        }
      });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">UserName</label>
        <input id="userName" type="text" onChange={handleChange} value={formData.userName} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="text" onChange={handleChange} value={formData.password} />
      </div>
      <button className="submit-button" type="submit">
        Submit
      </button>
      {!!error && <h3 className="error">{error}</h3>}
    </form>
  );
};
