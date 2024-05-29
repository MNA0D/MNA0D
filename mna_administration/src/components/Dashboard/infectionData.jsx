// src/infectionData.js
import { useEffect, useState } from 'react';
import { fetchInfectionData } from './fetchInfectionData.jsx';

export const useInfectionData = () => {
  const [infectionData, setInfectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchInfectionData();
        setInfectionData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { infectionData, loading, error };
};
