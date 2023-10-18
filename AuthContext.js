// // AuthContext.js

// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isSupervisor, setIsSupervisor }}>
      {children}
    </AuthContext.Provider>
  );
}
