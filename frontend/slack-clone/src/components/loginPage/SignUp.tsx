import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from 'hooks/useUserContext';

const DEFAULT_FORM_DATA = { firstName: '', lastName: '', userName: '', password: '', channels: [], directMessages: [] };
export const SignUp = (): React.ReactElement => {
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
      setError('please enter userName');
    }
    if (userName && !password) {
      setError('please enter password');
    }
    if (userName && password) {
      axios
        .post('/addUser', formData)
        .then(res => {
          console.log(res);
          if (res.data === 'success') {
            const userId = formData.userName + '-' + formData.password;

            setLoggedUser(userId);
          }
          if (res.data === 'exists') {
            setError('this user already exists please try to login');
          }
        })
        .catch(err => {
          throw Error(err);
        });

      // setFormData(DEFAULT_FORM_DATA);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">FirstName</label>
        <input id="firstName" type="text" onChange={handleChange} value={formData.firstName} />
      </div>
      <div>
        <label htmlFor="lastName">LastName</label>
        <input id="lastName" type="text" onChange={handleChange} value={formData.lastName} />
      </div>
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
