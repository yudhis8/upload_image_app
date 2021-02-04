import React, {useState, createContext} from 'react';

// Create Context Object
export const UserContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = (props) => {
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
