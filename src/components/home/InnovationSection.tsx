
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import PreRegisterForm from "@/components/PreRegisterForm";

interface InnovationSectionProps {
  innovationSectionY: any;
  innovationSectionOpacity: any;
}

const InnovationSection = ({ innovationSectionY, innovationSectionOpacity }: InnovationSectionProps) => {
  return (
    <motion.div 
      id="innovations" 
      className="py-24 relative z-10"
      style={{ opacity: innovationSectionOpacity, y: innovationSectionY }}
    >
      <ScrollReveal delay={0.4} direction="up" distance={80}>
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm overflow-hidden"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-center mb-8">Future Innovations</h2>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-1/3">
                  <motion.img 
                    src="/lovable-uploads/airpurifier.jpeg" 
                    alt="Smart Air Purifier" 
                    className="rounded-xl shadow-md object-cover w-full h-64"
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-2xl font-medium text-gray-900">Smart Air Purifier</h3>
                  <p className="text-gray-600">
                    Our upcoming smart air purifier features advanced HEPA filtration technology, designed specifically for Kathmandu's challenging air quality. Be the first to know when it launches!
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <p className="font-medium text-primary">NPR 14,000 (Early-bird price)</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-medium mb-4">Pre-register Now</h4>
                    <PreRegisterForm productName="Smart Air Purifier" price="NPR 14,000" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </ScrollReveal>
    </motion.div>
  );
};

export default InnovationSection;
