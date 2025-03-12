
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  icon?: string;
  qrCode?: string;
  details?: string;
}

const timeSlots = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

const ServiceCard = ({ title, price, description, icon, qrCode, details }: ServiceCardProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const { toast } = useToast();

  const handleBooking = () => {
    if (date && selectedTime) {
      toast({
        title: "Appointment Booked!",
        description: `Your appointment is scheduled for ${format(date, "PPP")} at ${selectedTime}`,
      });
      // Here we would typically send emails to both the customer and doctor
      console.log(`Booking confirmation email sent for ${format(date, "PPP")} at ${selectedTime}`);
    }
  };

  return (
    <Dialog>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
      >
        {icon && <img src={icon} alt={title} className="w-16 h-16 mb-4 mx-auto" />}
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-muted mb-4">{price}</p>
        <p className="text-gray-600 mb-6">{description}</p>
        <DialogTrigger asChild>
          <Button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-200">
            Learn More
          </Button>
        </DialogTrigger>
      </motion.div>
      <DialogContent className="sm:max-w-[425px]">
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">{title}</h4>
          <p className="mb-4">{details}</p>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
            {date && (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
            {qrCode && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-600">Scan to pay:</p>
                <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
              </div>
            )}
            {date && selectedTime && (
              <Button onClick={handleBooking} className="w-full">
                Book Appointment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;
