
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ContactSection = () => {
  return (
    <div id="contact" className="py-16 text-center">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-gray-700">Kathmandu, Nepal</span>
          </motion.div>
          <motion.a 
            href="mailto:Shashankneupane5107@gmail.com"
            className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Mail className="h-5 w-5 text-primary" />
            <span>Shashankneupane5107@gmail.com</span>
          </motion.a>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ContactSection;
