
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Check, CalendarDays, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  icon?: string;
  details?: string;
  imageSrc?: string;
}

const timeSlots = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

const ServiceCard = ({ title, price, description, icon, details, imageSrc }: ServiceCardProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [bookingStep, setBookingStep] = useState<'calendar' | 'time' | 'confirm' | 'success'>('calendar');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const resetBooking = () => {
    setDate(undefined);
    setSelectedTime(undefined);
    setBookingStep('calendar');
  };

  const handleBooking = () => {
    if (!date || !selectedTime) return;
    
    setIsLoading(true);
    
    // Simulate sending emails
    setTimeout(() => {
      // Send confirmation to user
      console.log(`Booking confirmation email sent to ${user?.email || 'user'} for ${format(date, "PPP")} at ${selectedTime}`);
      console.log(`Email content: Dear ${user?.firstName || 'User'}, your appointment for ${title} has been confirmed for ${format(date, "PPP")} at ${selectedTime}. Payment details will be sent separately.`);
      
      // Send notification to Dr. Shashank
      console.log(`Notification email sent to shashankneupane5107@gmail.com`);
      console.log(`Email content: New ${title} booking from ${user?.firstName || ''} ${user?.lastName || ''} (${user?.email || 'Not logged in'}) for ${format(date, "PPP")} at ${selectedTime}`);
      
      toast({
        title: "Appointment Scheduled!",
        description: `Your appointment is confirmed for ${format(date, "PPP")} at ${selectedTime}. Payment details have been sent to your email.`,
      });
      
      setIsLoading(false);
      setBookingStep('success');
    }, 1500);
  };

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" },
    tap: { scale: 0.98 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const ButtonWithAnimation = ({ onClick, children, className, disabled = false, ...props }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        onClick={onClick} 
        className={cn("relative overflow-hidden", className)}
        disabled={disabled}
        {...props}
      >
        <motion.span 
          className="absolute inset-0 bg-white/20 rounded-md"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: 0.3 }}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 1.5 }}
        />
        {children}
      </Button>
    </motion.div>
  );

  return (
    <Dialog onOpenChange={() => resetBooking()}>
      <DialogTrigger asChild>
        <motion.div
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg cursor-pointer overflow-hidden relative"
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative overflow-hidden rounded-xl mx-auto mb-6 bg-gray-100" style={{ width: '120px', height: '120px' }}>
            {imageSrc ? (
              <motion.div 
                className="w-full h-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              icon && <img src={icon} alt={title} className="w-full h-full object-contain p-4" />
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-lg font-medium text-primary mb-4">{price}</p>
            <p className="text-gray-600 mb-6">{description}</p>
          </motion.div>
          
          <ButtonWithAnimation className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-300 group">
            Book Appointment
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
              className="ml-2"
            >
              →
            </motion.span>
          </ButtonWithAnimation>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          {bookingStep === 'calendar' && (
            <motion.div 
              key="calendar"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="p-6"
            >
              <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-2">{title}</motion.h3>
              <motion.p variants={itemVariants} className="mb-6 text-gray-600">{details}</motion.p>
              
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <CalendarDays className="h-5 w-5 text-primary mr-2" />
                  <h4 className="font-medium">Select Appointment Date</h4>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        setBookingStep('time');
                      }
                    }}
                    className="rounded-lg border shadow pointer-events-auto mx-auto"
                    disabled={(currentDate) => {
                      const today = new Date();
                      return currentDate < today;
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
          
          {bookingStep === 'time' && (
            <motion.div 
              key="time"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="p-6"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setBookingStep('calendar')}
                  className="text-gray-500 hover:text-primary flex items-center"
                >
                  <motion.span whileHover={{ x: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                    ← Back
                  </motion.span>
                </button>
                
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">
                    {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <h4 className="font-medium">Select Appointment Time</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <motion.div
                      key={time}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => {
                          setSelectedTime(time);
                          if (time) {
                            setTimeout(() => setBookingStep('confirm'), 300);
                          }
                        }}
                        className={cn(
                          "w-full justify-center h-12", 
                          selectedTime === time && "bg-primary"
                        )}
                      >
                        {time}
                        {selectedTime === time && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {bookingStep === 'confirm' && (
            <motion.div 
              key="confirm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="p-6"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setBookingStep('time')}
                  className="text-gray-500 hover:text-primary flex items-center"
                >
                  <motion.span whileHover={{ x: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                    ← Back
                  </motion.span>
                </button>
                
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-blue-50 rounded-xl p-5 shadow-sm mb-6">
                <h4 className="font-medium text-blue-700 mb-3">Appointment Details</h4>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{date ? format(date, "MMMM d, yyyy") : ""}</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{selectedTime}</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{user?.email || "Not logged in"}</span>
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-gray-600 text-sm">
                  By confirming this appointment, you agree to pay {price} for the {title.toLowerCase()}. 
                  Payment details will be sent to your email after confirmation.
                </p>
                
                <ButtonWithAnimation 
                  onClick={handleBooking} 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>Confirm Appointment</>
                  )}
                </ButtonWithAnimation>
              </motion.div>
            </motion.div>
          )}
          
          {bookingStep === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="p-8 flex flex-col items-center justify-center text-center"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                {date && selectedTime ? (
                  <>
                    Your {title.toLowerCase()} is scheduled for {format(date, "MMMM d, yyyy")} at {selectedTime}.
                  </>
                ) : (
                  "Your appointment has been confirmed."
                )}
              </p>
              
              <div className="bg-blue-50 w-full rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-700 mb-2 font-medium">What happens next?</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Payment details have been sent to your email
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You'll receive a reminder 24 hours before your appointment
                  </li>
                </ul>
              </div>
              
              <ButtonWithAnimation
                onClick={() => resetBooking()}
                variant="outline"
                className="w-full"
              >
                Done
              </ButtonWithAnimation>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;
