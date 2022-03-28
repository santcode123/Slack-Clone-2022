import { useEffect, useState } from 'react';
import axios from 'axios';

//types
import { AllDatabaseType } from 'types';

//constants
import { PENDING } from 'Constants';

function useFetchAllDatabase(userId: string) {
  const [data, setData] = useState<AllDatabaseType | null>(null);
  const [status, setStatus] = useState(PENDING);

  useEffect(() => {
    async function getAllDatabase() {
      try {
        const response = await axios.get(`allDatabase/${userId}`);
        const data = await response.data;
        setData(data);
        setStatus('success');
        // await new Promise(resolve => setTimeout(resolve, 3000));
        await getAllDatabase();
      } catch (err) {
        setStatus('error');
        await getAllDatabase();
      }
    }
    getAllDatabase();
  }, [userId]);

  return {
    status,
    data,
  };
}

export { useFetchAllDatabase };
