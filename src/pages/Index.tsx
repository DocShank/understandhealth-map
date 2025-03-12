
import SignupForm from "@/components/SignupForm";
import ServiceCard from "@/components/ServiceCard";
import { Mail, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Empowering You to Understand Your Health
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your Guide to Understanding Your Health Like Never Before
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto md:mx-0 mb-6">
                <img
                  src="/lovable-uploads/904e6abc-6924-451a-9c55-df1221a38ba7.png"
                  alt="Dr. Shashank Neupane"
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Dr. Shashank Neupane
              </h2>
              <p className="text-lg text-gray-600">
                A dedicated physician, researcher, and health educator with experience in Nepal and the United States.
                Specializing in making complex medical information easily understandable through interactive demonstrations and personalized care.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>Shashankneupane5107@gmail.com</span>
              </div>
            </div>
          </div>
          
          <SignupForm />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
          <ServiceCard
            title="In-Person Consultation"
            price="NPR 1,000"
            description="Home Visit & Interactive Demo"
            icon="/icons/home-visit.png"
            qrCode="/lovable-uploads/f23102a4-77e9-4620-a683-330f02767496.png"
            details="Experience personalized health education at your doorstep. We use interactive demonstrations, models, and real-time explanations to help you fully understand your health condition."
          />
          
          <ServiceCard
            title="Virtual Consultation"
            price="NPR 500"
            description="Online Consultation"
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
      </div>
    </div>
  );
};

export default Index;
