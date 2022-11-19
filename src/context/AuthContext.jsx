import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  console.log(currentUser);
  useEffect(() => {
    userObserver(setCurrentUser);
    console.log(currentUser);
  }, []);
  console.log(currentUser);

  return (
    <div>
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
