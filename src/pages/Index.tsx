
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import { Mail, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Empowering You to Understand Your Health
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Your Guide to Understanding Your Health Like Never Before
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-900">
                Dr. Shashank Neupane
              </h2>
              <p className="text-lg text-muted">
                A dedicated physician, researcher, and health educator with experience in Nepal and the United States.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <Button
                variant="secondary"
                className="h-12 text-lg justify-start space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Kathmandu, Nepal</span>
              </Button>
              <Button
                variant="secondary"
                className="h-12 text-lg justify-start space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Shashankneupane5107@gmail.com</span>
              </Button>
            </div>
          </div>
          
          <LoginForm />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">In-Person Consultation</h3>
            <p className="text-muted mb-4">NPR 1,000 (Home Visit & Demo)</p>
            <Button className="w-full h-12">Book Now</Button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Virtual Consultation</h3>
            <p className="text-muted mb-4">NPR 500 (Online Consultation)</p>
            <Button className="w-full h-12">Book Now</Button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Smart Air Purifier</h3>
            <p className="text-muted mb-4">Coming Soon - $80 to $100</p>
            <Button variant="secondary" className="w-full h-12">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
