
import { User } from "@/types/auth";
import { motion } from "framer-motion";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const getFullName = () => {
    if (user.middleName) {
      return `${user.firstName} ${user.middleName} ${user.lastName}`;
    }
    return `${user.firstName} ${user.lastName}`;
  };
  
  return (
    <motion.div 
      className="fixed top-16 right-6 z-50 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          {user.firstName.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{getFullName()}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfo;
