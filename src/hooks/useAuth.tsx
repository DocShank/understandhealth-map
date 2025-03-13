
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type User = {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, middleName: string, lastName: string) => Promise<void>;
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
    const storedFirstName = localStorage.getItem("userFirstName");
    const storedMiddleName = localStorage.getItem("userMiddleName");
    const storedLastName = localStorage.getItem("userLastName");
    
    if (storedEmail && storedFirstName && storedLastName) {
      setUser({ 
        email: storedEmail, 
        firstName: storedFirstName,
        middleName: storedMiddleName || '',
        lastName: storedLastName,
        isAuthenticated: true 
      });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // In a real app, this would be an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if the user exists in localStorage
        const storedFirstName = localStorage.getItem(`firstName_${email}`);
        const storedMiddleName = localStorage.getItem(`middleName_${email}`);
        const storedLastName = localStorage.getItem(`lastName_${email}`);
        const storedPassword = localStorage.getItem(`password_${email}`);
        
        if (storedPassword === password) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userFirstName", storedFirstName || '');
          localStorage.setItem("userMiddleName", storedMiddleName || '');
          localStorage.setItem("userLastName", storedLastName || '');
          
          setUser({ 
            email, 
            firstName: storedFirstName || '',
            middleName: storedMiddleName || '',
            lastName: storedLastName || '',
            isAuthenticated: true 
          });
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signUp = async (email: string, password: string, firstName: string, middleName: string, lastName: string) => {
    setLoading(true);
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Store user details
        localStorage.setItem(`firstName_${email}`, firstName);
        localStorage.setItem(`middleName_${email}`, middleName);
        localStorage.setItem(`lastName_${email}`, lastName);
        localStorage.setItem(`password_${email}`, password);
        
        // Simulate sending welcome email
        console.log(`Welcome email sent to: ${email}`);
        console.log(`Email content: Welcome to Empowering Your Health! Thank you for creating your account, ${firstName} ${lastName}.`);
        
        // Also send a copy to Dr. Shashank
        console.log(`Copy of welcome email sent to: shashankneupane5107@gmail.com`);
        console.log(`Email content: New user registered: ${firstName} ${middleName} ${lastName} (${email})`);
        
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userMiddleName");
    localStorage.removeItem("userLastName");
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
