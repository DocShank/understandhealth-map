
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SignupForm from "@/components/SignupForm";
import { User } from "@/types/auth";

interface ProfileSectionProps {
  profileSectionY: any;
  profileSectionOpacity: any;
  user: User | null;
}

const ProfileSection = ({ profileSectionY, profileSectionOpacity, user }: ProfileSectionProps) => {
  return (
    <motion.div 
      className="py-24 relative z-10"
      style={{ opacity: profileSectionOpacity, y: profileSectionY }}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal 
          delay={0.2} 
          direction="left"
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.div 
              className="relative w-64 h-80 mx-auto md:mx-0 mb-8 overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.4 }
              }}
            >
              <motion.div 
                className="w-full h-full"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="/lovable-uploads/904e6abc-6924-451a-9c55-df1221a38ba7.png"
                  alt="Dr. Shashank Neupane"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Dr. Shashank Neupane</p>
                  <p className="text-xs">Health Educator</p>
                </div>
              </motion.div>
            </motion.div>
            <h2 className="text-3xl font-semibold text-gray-900">Dr. Shashank Neupane</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A dedicated physician, researcher, and health educator with experience in Nepal and the United States.
              Specializing in making complex medical information easily understandable through interactive demonstrations and personalized care.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <motion.a 
              href="https://maps.google.com" 
              target="_blank"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
            >
              <MapPin className="h-5 w-5" />
              <span>Kathmandu, Nepal</span>
            </motion.a>
            <motion.a 
              href="mailto:Shashankneupane5107@gmail.com"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
            >
              <Mail className="h-5 w-5" />
              <span>Shashankneupane5107@gmail.com</span>
            </motion.a>
          </div>
        </ScrollReveal>
        
        <AnimatePresence mode="wait">
          {!user?.isAuthenticated ? <SignupForm /> : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Welcome, {user.firstName}!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for joining us on this journey to better health understanding. Explore our services below or visit your profile to manage your appointments.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
