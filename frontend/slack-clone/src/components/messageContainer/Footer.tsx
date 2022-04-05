import React, { useCallback, useState, Ref } from 'react';
import axios from 'axios';
//react-icons
import { BiSend } from 'react-icons/bi';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';
import { SelectedType } from 'types';

//Constants
import { CHANNEL, DIRECT_MESSAGE, USER } from 'Constants';

export const Footer = React.forwardRef(
  ({ id, type }: { id: string; type?: SelectedType }, ref: any): React.ReactElement => {
    const [inputValue, setInputValue] = useState('');
    const [loggedUser] = useLoggedUserContext();
    const { userId: loggedUserId } = loggedUser;

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, []);

    const handleSend = useCallback(
      (e: React.FormEvent<HTMLFormElement> & React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        if (type === CHANNEL) axios.post(`send/message/channel/${id}`, { message: inputValue, userId: loggedUserId });

        if (type === DIRECT_MESSAGE) {
          axios.post(`send/directMessage/${loggedUserId}`, { message: inputValue, directMessageId: id });
        }
        setInputValue('');
        const timeoutId = setTimeout(() => {
          const scroll = ref.current?.scrollHeight - ref.current?.clientHeight;
          ref.current?.scrollTo(0, scroll);
          clearTimeout(timeoutId);
        }, 500);
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
