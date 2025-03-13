
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, verifyCode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      if (!verificationStep) {
        try {
          // Attempt to sign up
          await signUp(email, password, firstName, middleName, lastName);
          
          toast({
            title: "Verification Code Sent!",
            description: `We've sent a 6-digit code to ${email}. Please check the console (for demo purposes).`,
          });
          
          setVerificationStep(true);
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "Failed to create account. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      } else {
        try {
          // Verify the code
          await verifyCode(email, enteredCode);
          
          toast({
            title: "Welcome!",
            description: "Account created and verified successfully. You can now sign in.",
          });
          
          // Reset the form and show login
          setVerificationStep(false);
          setIsSignUp(false);
        } catch (error: any) {
          toast({
            title: "Invalid Code",
            description: error.message || "The verification code you entered is incorrect.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    } else {
      try {
        // Attempt to sign in
        await signIn(email, password);
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        navigate("/dashboard");
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 } 
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 25, delay: 0.3 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="w-full max-w-md p-8 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8 
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? (verificationStep ? "verify" : "signup") : "signin"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={formVariants}
        >
          <motion.h2 
            className="text-2xl font-semibold text-gray-900 mb-6"
            variants={inputVariants}
          >
            {isSignUp 
              ? (verificationStep ? "Verify Your Email" : "Create Account") 
              : "Welcome Back"
            }
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && !verificationStep ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <motion.div variants={inputVariants} className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="pl-10 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </motion.div>
                  <motion.div variants={inputVariants} className="relative">
                    <Input
                      type="text"
                      placeholder="Middle Name"
                      className="pl-3 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </motion.div>
                </div>
                <motion.div variants={inputVariants} className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="pl-10 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </motion.div>
                <motion.div variants={inputVariants} className="relative">
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
                <motion.div variants={inputVariants} className="relative">
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
            ) : isSignUp && verificationStep ? (
              <motion.div variants={inputVariants} className="space-y-3">
                <p className="text-sm text-gray-600 mb-2">
                  Please enter the 6-digit verification code sent to <span className="font-medium">{email}</span>
                  <br /><span className="text-xs text-gray-500">(For demo purposes, check the console log)</span>
                </p>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="6-digit code"
                    className="pl-3 h-12 bg-secondary focus:ring-2 focus:ring-primary transition-all duration-300 text-center text-lg tracking-widest"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value.slice(0, 6))}
                    maxLength={6}
                    required
                  />
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <motion.div variants={inputVariants} className="relative">
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
                <motion.div variants={inputVariants} className="relative">
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
            )}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
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
                    {isSignUp 
                      ? (verificationStep ? "Verify & Create Account" : "Continue") 
                      : "Sign In"
                    }
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                      className="ml-2"
                    >
                      {isSignUp && verificationStep ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </motion.div>
                  </>
                )}
              </Button>
            </motion.div>
            <motion.p 
              className="text-center text-sm text-gray-600"
              variants={inputVariants}
            >
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setVerificationStep(false);
                }}
                className="text-primary hover:underline focus:outline-none font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </motion.p>
            {verificationStep && (
              <motion.p 
                className="text-center text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Didn't receive a code?{" "}
                <button
                  type="button"
                  onClick={() => {
                    // Simulate resending the code
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    console.log(`New verification code for ${email}: ${newCode}`);
                    
                    // Update the verification code in localStorage
                    const codes = JSON.parse(localStorage.getItem('verificationCodes') || '{}');
                    codes[email] = newCode;
                    localStorage.setItem('verificationCodes', JSON.stringify(codes));
                    
                    toast({
                      title: "New Code Sent!",
                      description: "A new verification code has been sent. Check the console (for demo purposes).",
                    });
                  }}
                  className="text-primary hover:underline focus:outline-none font-medium"
                >
                  Resend
                </button>
              </motion.p>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SignupForm;
