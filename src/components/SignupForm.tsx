
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (isSignUp) {
        // Simulate signup and email sending
        toast({
          title: "Welcome!",
          description: "Please check your email to complete signup.",
        });
        console.log(`Welcome email sent to: ${email}`);
      } else {
        // Simulate login
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        // Store email in localStorage for display in header
        localStorage.setItem("userEmail", email);
      }
      
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <motion.div 
      className="w-full max-w-md p-8 rounded-2xl bg-white/90 backdrop-blur-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-2xl font-semibold text-gray-900 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isSignUp ? "Create Account" : "Welcome Back"}
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <motion.div 
            className="relative"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div 
            className="relative"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
        </div>
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                {isSignUp ? "Sign Up" : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
        </motion.div>
        <motion.p 
          className="text-center text-sm text-gray-600"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline focus:outline-none"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </motion.p>
      </form>
    </motion.div>
  );
};

export default SignupForm;
