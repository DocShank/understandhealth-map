
import { User } from "@/types/auth";

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
    <div className="fixed top-16 right-6 z-50 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
          {user.firstName.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{getFullName()}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
