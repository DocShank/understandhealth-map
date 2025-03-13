
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, UserRegistration, Appointment, PreRegistration } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, middleName: string, lastName: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  verifyCode: (email: string, code: string) => Promise<void>;
  registerAppointment: (email: string, service: string, date: string, time: string) => Promise<void>;
  registerForAirPurifier: (firstName: string, lastName: string, email: string, reason: string) => Promise<void>;
  getAllUsers: () => UserRegistration[];
  getAllAppointments: () => Appointment[];
  getAllPreRegistrations: () => PreRegistration[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

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

  // Initialize data structures if they don't exist
  useEffect(() => {
    if (!getFromLocalStorage('users')) {
      saveToLocalStorage('users', []);
    }
    if (!getFromLocalStorage('appointments')) {
      saveToLocalStorage('appointments', []);
    }
    if (!getFromLocalStorage('preRegistrations')) {
      saveToLocalStorage('preRegistrations', []);
    }
    if (!getFromLocalStorage('verificationCodes')) {
      saveToLocalStorage('verificationCodes', {});
    }
  }, []);

  const verifyCode = async (email: string, code: string) => {
    return new Promise<void>((resolve, reject) => {
      const codes = getFromLocalStorage('verificationCodes') || {};
      
      if (codes[email] === code) {
        // Get the pending user data
        const users = getFromLocalStorage('users') || [];
        const pendingUserIndex = users.findIndex((u: User) => u.email === email && !u.isAuthenticated);
        
        if (pendingUserIndex !== -1) {
          // Update the user to authenticated
          users[pendingUserIndex].isAuthenticated = true;
          saveToLocalStorage('users', users);
          
          // Clean up the verification code
          delete codes[email];
          saveToLocalStorage('verificationCodes', codes);
          
          resolve();
        } else {
          reject(new Error("User not found"));
        }
      } else {
        reject(new Error("Invalid verification code"));
      }
    });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Get users from localStorage
        const users = getFromLocalStorage('users') || [];
        const user = users.find((u: UserRegistration & { password: string }) => 
          u.email === email && u.password === password && u.isAuthenticated
        );
        
        if (user) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userFirstName", user.firstName);
          localStorage.setItem("userMiddleName", user.middleName || '');
          localStorage.setItem("userLastName", user.lastName);
          
          setUser({ 
            email, 
            firstName: user.firstName,
            middleName: user.middleName || '',
            lastName: user.lastName,
            isAuthenticated: true,
            createdAt: user.createdAt
          });
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials or account not verified"));
        }
      }, 1000);
    });
  };

  const signUp = async (email: string, password: string, firstName: string, middleName: string, lastName: string) => {
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Get existing users
        const users = getFromLocalStorage('users') || [];
        
        // Check if user already exists
        if (users.some((u: User) => u.email === email)) {
          setLoading(false);
          reject(new Error("User with this email already exists"));
          return;
        }
        
        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store verification code
        const codes = getFromLocalStorage('verificationCodes') || {};
        codes[email] = verificationCode;
        saveToLocalStorage('verificationCodes', codes);
        
        // Store user data
        const newUser = {
          email,
          password, // In a real app, this would be hashed
          firstName,
          middleName,
          lastName,
          isAuthenticated: false,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        saveToLocalStorage('users', users);
        
        // Simulate sending verification email
        console.log(`Verification code for ${email}: ${verificationCode}`);
        
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
  
  const registerAppointment = async (email: string, service: string, date: string, time: string) => {
    return new Promise<void>((resolve) => {
      // Get the current user
      const users = getFromLocalStorage('users') || [];
      const currentUser = users.find((u: User) => u.email === email);
      
      if (!currentUser) {
        resolve();
        return;
      }
      
      // Get appointments
      const appointments = getFromLocalStorage('appointments') || [];
      
      // Add new appointment
      const newAppointment = {
        id: Date.now(),
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email,
        service,
        date,
        time
      };
      
      appointments.push(newAppointment);
      saveToLocalStorage('appointments', appointments);
      
      resolve();
    });
  };
  
  const registerForAirPurifier = async (firstName: string, lastName: string, email: string, reason: string) => {
    return new Promise<void>((resolve) => {
      // Get pre-registrations
      const preRegistrations = getFromLocalStorage('preRegistrations') || [];
      
      // Add new pre-registration
      const newRegistration = {
        id: Date.now(),
        name: `${firstName} ${lastName}`,
        email,
        reason
      };
      
      preRegistrations.push(newRegistration);
      saveToLocalStorage('preRegistrations', preRegistrations);
      
      resolve();
    });
  };
  
  const getAllUsers = () => {
    return getFromLocalStorage('users') || [];
  };
  
  const getAllAppointments = () => {
    return getFromLocalStorage('appointments') || [];
  };
  
  const getAllPreRegistrations = () => {
    return getFromLocalStorage('preRegistrations') || [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      verifyCode,
      registerAppointment,
      registerForAirPurifier,
      getAllUsers,
      getAllAppointments,
      getAllPreRegistrations
    }}>
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
