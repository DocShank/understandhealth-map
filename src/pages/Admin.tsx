
import AdminPanel from "@/components/AdminPanel";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <AdminPanel />
      </div>
    </motion.div>
  );
};

export default Admin;
