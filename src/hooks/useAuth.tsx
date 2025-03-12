
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type User = {
  email: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUser({ email: storedEmail, isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        localStorage.setItem("userEmail", email);
        setUser({ email, isAuthenticated: true });
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        localStorage.setItem("userEmail", email);
        setUser({ email, isAuthenticated: true });
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
