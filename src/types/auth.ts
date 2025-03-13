
export interface User {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  isAuthenticated: boolean;
  createdAt?: string;
}

export interface UserRegistration extends User {
  reason?: string;
  service?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

export interface Appointment {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  price?: string;
}

export interface PreRegistration {
  id: number;
  name: string;
  email: string;
  reason: string;
}
