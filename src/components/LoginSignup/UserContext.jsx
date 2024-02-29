// UserContext.jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateUser = (newUserData) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
