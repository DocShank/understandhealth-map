
import SignupForm from "@/components/SignupForm";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <ScrollReveal className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering You to Understand Your Health
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your Guide to Understanding Your Health Like Never Before
          </motion.p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <ScrollReveal className="space-y-8">
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto md:mx-0 mb-6 overflow-hidden rounded-2xl">
                <motion.img
                  src="/lovable-uploads/904e6abc-6924-451a-9c55-df1221a38ba7.png"
                  alt="Dr. Shashank Neupane"
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">Dr. Shashank Neupane</h2>
              <p className="text-lg text-gray-600">
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
          
          <SignupForm />
        </div>

        <ScrollReveal>
          <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="In-Person Consultation"
              price="NPR 1,000"
              description="Experience personalized health education at your doorstep"
              icon="/icons/home-visit.png"
              qrCode="/lovable-uploads/f23102a4-77e9-4620-a683-330f02767496.png"
              details="Experience personalized health education at your doorstep. We use interactive demonstrations, models, and real-time explanations to help you fully understand your health condition."
            />
            
            <ServiceCard
              title="Virtual Consultation"
              price="NPR 500"
              description="Connect with us from anywhere"
              icon="/icons/virtual-consult.png"
              qrCode="/lovable-uploads/f23102a4-77e9-4620-a683-330f02767496.png"
              details="Connect with us virtually for comprehensive health guidance. Get detailed explanations and visual aids to understand your condition better, all from the comfort of your home."
            />
            
            <ServiceCard
              title="Smart Air Purifier"
              price="Coming Soon - $80 to $100"
              description="Advanced HEPA Filtration"
              icon="/icons/air-purifier.png"
              details="Our upcoming smart air purifier features advanced HEPA filtration technology, perfect for Kathmandu's challenging air quality. Pre-register now to be the first to know when it launches."
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
