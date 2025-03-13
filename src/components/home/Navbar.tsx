
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "@/types/auth";
import { UserIcon } from "lucide-react";

interface NavbarProps {
  navOpacity: any;
  user: User | null;
}

const Navbar = ({ navOpacity, user }: NavbarProps) => {
  const getFullName = () => {
    if (!user) return "";
    
    if (user.middleName) {
      return `${user.firstName} ${user.middleName} ${user.lastName}`;
    }
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6"
      style={{ opacity: navOpacity }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-primary font-semibold text-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">Empower Health</Link>
        </motion.div>
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
            <a href="#innovations" className="text-gray-700 hover:text-primary transition-colors">Innovations</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
            <Link to="/admin" className="text-primary hover:text-primary/80 transition-colors">Admin</Link>
          </motion.div>
          
          {user && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm"
            >
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                {user.firstName.charAt(0)}
              </div>
              <span className="text-sm font-medium">{getFullName()}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
