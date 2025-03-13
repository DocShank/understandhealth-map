
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface PreRegisterFormProps {
  productName: string;
  price: string;
}

const PreRegisterForm = ({ productName, price }: PreRegisterFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to store data
    setTimeout(() => {
      // Log the pre-registration data (would be sent to backend in real app)
      console.log(`Pre-registration for ${productName} from ${firstName} ${lastName} (${email})`);
      console.log(`Reason for interest: ${reason}`);
      
      // Email notification to Dr. Shashank
      console.log(`Email sent to shashankneupane5107@gmail.com`);
      console.log(`Email content: New pre-registration for ${productName}: ${firstName} ${lastName} (${email}). Reason: ${reason}`);
      
      toast({
        title: "Pre-registration Successful!",
        description: `Thank you for your interest in the ${productName}. We'll notify you when it launches.`,
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={inputVariants}>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full"
                  required
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                  required
                />
              </motion.div>
            </div>

            <motion.div variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Why are you interested in this product?
              </label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full min-h-[100px]"
                required
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 relative overflow-hidden"
                disabled={isSubmitting}
              >
                <motion.span 
                  className="absolute inset-0 bg-white/20 rounded-md"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: 0.3 }}
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1.5 }}
                />
                {isSubmitting ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  "Pre-register Now"
                )}
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="h-8 w-8 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your pre-registration for the {productName} has been received.
              We'll notify you when it's available for purchase.
            </p>
            <p className="text-sm text-gray-500">Early-bird price: {price}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreRegisterForm;
