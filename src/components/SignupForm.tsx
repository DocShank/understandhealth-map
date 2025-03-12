
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Simulate signup email
      toast({
        title: "Welcome!",
        description: "Please check your email to complete signup.",
      });
      // Simulate sending confirmation email
      console.log(`Welcome email sent to: ${email}`);
    }
    
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg animate-fade-up">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 h-12 bg-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-12 bg-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-200"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <p className="text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
