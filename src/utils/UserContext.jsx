// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const SelectedItemContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [selectedItem, setSelectedItem] = useState();

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
        {children}
      </SelectedItemContext.Provider>
    </UserContext.Provider>
  );
};

