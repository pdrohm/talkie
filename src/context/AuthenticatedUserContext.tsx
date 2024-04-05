import React, { createContext, useState, ReactNode } from "react";

type FirebaseUser = {
  createdAt: string;
  displayName: string;
  apiKey: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  photoURL?: string;
};


interface AuthContextType {
  user: FirebaseUser | null;
  setUser: (user: any) => void;
}

const AuthenticatedUserContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { }
});

interface AuthenticatedUserProviderProps {
  children: ReactNode;
}

const AuthenticatedUserProvider = ({ children }: AuthenticatedUserProviderProps) => {
  const [user, setUser] = useState<any>(null);

  console.log('user', user)

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export { AuthenticatedUserContext, AuthenticatedUserProvider };
