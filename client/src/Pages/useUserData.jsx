import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("resp");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData.user.name);
    }
  }, []);

  return userData;
};

export default useUserData;
