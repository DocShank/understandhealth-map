
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, PaperclipIcon, Download, Users, Database } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { User as UserType, Appointment, PreRegistration } from "@/types/auth";

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { getAllUsers, getAllAppointments, getAllPreRegistrations } = useAuth();
  
  const [registeredUsers, setRegisteredUsers] = useState<UserType[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[]>([]);

  // Check if admin data is stored in local storage to persist admin session
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      // Load all data when authenticated
      setRegisteredUsers(getAllUsers());
      setAppointments(getAllAppointments());
      setPreRegistrations(getAllPreRegistrations());
    }
  }, [getAllUsers, getAllAppointments, getAllPreRegistrations]);

  // Refresh data whenever isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated) {
      // Load all data when authenticated
      setRegisteredUsers(getAllUsers());
      setAppointments(getAllAppointments());
      setPreRegistrations(getAllPreRegistrations());
    }
  }, [isAuthenticated, getAllUsers, getAllAppointments, getAllPreRegistrations]);

  // Periodically refresh data for real-time updates (every 5 seconds)
  useEffect(() => {
    if (isAuthenticated) {
      const intervalId = setInterval(() => {
        setRegisteredUsers(getAllUsers());
        setAppointments(getAllAppointments());
        setPreRegistrations(getAllPreRegistrations());
      }, 5000);
      
      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, getAllUsers, getAllAppointments, getAllPreRegistrations]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // Fixed username to match the requested "Shashank" instead of any case variations
      if (username === "Shashank" && password === "7705*Shashank") {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuthenticated", "true");
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel, Dr. Shashank.",
        });
        
        // Load all data
        setRegisteredUsers(getAllUsers());
        setAppointments(getAllAppointments());
        setPreRegistrations(getAllPreRegistrations());
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  const downloadData = (data: any[], type: string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${type}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold text-center mb-8"
            >
              Admin Login
            </motion.h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <PaperclipIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Registered Users
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="registrations" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Pre-Registrations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Registered Users ({registeredUsers.length})</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadData(registeredUsers, "users")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered On
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {registeredUsers.length > 0 ? (
                        registeredUsers.map((user: any, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.firstName} {user.middleName || ''} {user.lastName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.isAuthenticated ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Verified
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            No users registered yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="appointments" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recent Appointments ({appointments.length})</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadData(appointments, "appointments")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {appointment.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.date} at {appointment.time}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            No appointments booked yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="registrations" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Smart Air Purifier Pre-Registrations ({preRegistrations.length})</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadData(preRegistrations, "pre_registrations")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason for Interest
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {preRegistrations.length > 0 ? (
                        preRegistrations.map((registration) => (
                          <tr key={registration.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {registration.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {registration.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {registration.reason}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                            No pre-registrations yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminPanel;
