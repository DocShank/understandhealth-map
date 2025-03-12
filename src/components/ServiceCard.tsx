
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  icon?: string;
  qrCode?: string;
  details?: string;
  imageSrc?: string;
}

const timeSlots = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

const ServiceCard = ({ title, price, description, icon, qrCode, details, imageSrc }: ServiceCardProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [bookingComplete, setBookingComplete] = useState(false);
  const { toast } = useToast();

  const handleBooking = () => {
    if (date && selectedTime) {
      setBookingComplete(true);
      
      // Simulate sending emails
      setTimeout(() => {
        toast({
          title: "Appointment Booked!",
          description: `Your appointment is scheduled for ${format(date, "PPP")} at ${selectedTime}`,
        });
        
        // Here we would typically send emails to both the customer and doctor
        console.log(`Booking confirmation email sent for ${format(date, "PPP")} at ${selectedTime}`);
        console.log(`Email sent to doctor: New appointment on ${format(date, "PPP")} at ${selectedTime}`);
        
        setBookingComplete(false);
        setDate(undefined);
        setSelectedTime(undefined);
      }, 1500);
    }
  };

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5 },
    tap: { scale: 0.98 }
  };

  return (
    <Dialog>
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
              <motion.img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              icon && <img src={icon} alt={title} className="w-full h-full object-contain p-4" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className="text-lg font-medium text-primary mb-4">{price}</p>
          <p className="text-gray-600 mb-6">{description}</p>
          <Button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-300 group">
            Learn More
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
              className="ml-2"
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-xl">
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xl font-semibold mb-4">{title}</h4>
          <p className="mb-6 text-gray-600">{details}</p>
          
          {!bookingComplete ? (
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-3">Select Appointment Date</h5>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow pointer-events-auto mx-auto"
                  disabled={(date) => {
                    const today = new Date();
                    return date < today;
                  }}
                />
              </div>
              
              {date && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h5 className="font-medium">Select Time</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "w-full justify-center", 
                          selectedTime === time && "bg-primary"
                        )}
                      >
                        {time}
                        {selectedTime === time && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {qrCode && date && selectedTime && (
                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-3 text-sm text-gray-600">Scan to pay:</p>
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                </motion.div>
              )}
              
              {date && selectedTime && (
                <Button 
                  onClick={handleBooking} 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                >
                  Book Appointment
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-600">Processing your booking...</p>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;
