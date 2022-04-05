import { useEffect, useState } from 'react';
import axios from 'axios';

//types
import { UserDataType } from 'types';

//constants
import { PENDING } from 'Constants';

function useFetchUserData(userId: string, type?: string, selectedId?: string) {
  const [data, setData] = useState<UserDataType | null>(null);
  const [status, setStatus] = useState(PENDING);
  let isPollingStop: boolean = false;

  useEffect(() => {
    async function getUserData() {
      const response = await axios.post(`userData/longPolling/${userId}`, { type, selectedId });
      const data = await response.data;
      setData(data);
      setStatus('success');
      // await new Promise(resolve => setTimeout(resolve, 3000));
      if (!isPollingStop) await getUserData();
    }
    getUserData();

    return () => {
      isPollingStop = true;
    };
  }, [userId, selectedId, type]);

  return {
    status,
    data,
  };
}

export { useFetchUserData };
