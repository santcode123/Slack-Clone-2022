import React, { useCallback, useState, Ref } from 'react';
import axios from 'axios';
//react-icons
import { BiSend } from 'react-icons/bi';

//hooks
import { useUserContext } from 'hooks/useUserContext';
import { SelectedOptionType } from 'types';

//Constants
import { CHANNEL, USER } from 'Constants';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Footer = React.forwardRef(
  ({ id, type }: { id: string; type: SelectedOptionType }, ref: any): React.ReactElement => {
    const [inputValue, setInputValue] = useState('');
    const [loggedUser] = useUserContext();
    const { userId: loggedUserId = '' } = loggedUser ?? {};

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, []);

    const handleSend = useCallback(
      (e: React.FormEvent<HTMLFormElement> & React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        if (type === CHANNEL)
          axios.post(`${BASE_URL}/send/message/channel/${id}`, { message: inputValue, userId: loggedUserId });

        if (type === USER) {
          axios.post(`${BASE_URL}/send/message/directUser/${loggedUserId}`, { message: inputValue, directUserId: id });
        }
        setInputValue('');
        const timeoutId = setTimeout(() => {
          const scroll = ref.current?.scrollHeight - ref.current?.clientHeight;
          ref.current?.scrollTo(0, scroll);
          clearTimeout(timeoutId);
        }, 1000);
        // scroll when data is available
      },
      [inputValue, id, loggedUserId, ref, type]
    );

    return (
      <form className="footer-container" onSubmit={handleSend}>
        <input value={inputValue} onChange={handleChange} />
        <BiSend className={inputValue ? 'active' : ''} onClick={handleSend} />
      </form>
    );
  }
);
