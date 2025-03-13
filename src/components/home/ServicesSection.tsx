
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";

interface ServicesSectionProps {
  servicesSectionY: any;
  servicesSectionOpacity: any;
}

const ServicesSection = ({ servicesSectionY, servicesSectionOpacity }: ServicesSectionProps) => {
  return (
    <motion.div 
      id="services" 
      className="py-24 relative z-10"
      style={{ opacity: servicesSectionOpacity, y: servicesSectionY }}
    >
      <ScrollReveal className="mb-16" delay={0.3}>
        <motion.h2 
          className="text-4xl font-semibold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Experience personalized health education designed to make complex medical information easy to understand.
        </motion.p>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <ServiceCard
          title="In-Person Consultation"
          price="NPR 1,000"
          description="Experience personalized health education at your doorstep"
          imageSrc="/lovable-uploads/in-person.jpeg"
          details="Experience personalized health education at your doorstep. We use interactive demonstrations, models, and real-time explanations to help you fully understand your health condition."
        />
        
        <ServiceCard
          title="Virtual Consultation"
          price="NPR 500"
          description="Connect with us from anywhere"
          imageSrc="/lovable-uploads/virtual.jpeg"
          details="Connect with us virtually for comprehensive health guidance. Get detailed explanations and visual aids to understand your condition better, all from the comfort of your home."
        />
      </div>
    </motion.div>
  );
};

export default ServicesSection;
