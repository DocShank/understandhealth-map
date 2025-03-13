
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "@/types/auth";

interface NavbarProps {
  navOpacity: any;
  user: User | null;
}

const Navbar = ({ navOpacity, user }: NavbarProps) => {
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
          Empower Health
        </motion.div>
        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
          <a href="#innovations" className="text-gray-700 hover:text-primary transition-colors">Innovations</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
          {user?.isAuthenticated ? (
            <Link to="/admin" className="text-primary hover:text-primary/80 transition-colors">Admin</Link>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
