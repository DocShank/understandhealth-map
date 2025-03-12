
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  icon?: string;
  qrCode?: string;
  details?: string;
}

const ServiceCard = ({ title, price, description, icon, qrCode, details }: ServiceCardProps) => {
  return (
    <Dialog>
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
        {icon && <img src={icon} alt={title} className="w-16 h-16 mb-4 mx-auto" />}
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-muted mb-4">{price}</p>
        <p className="text-gray-600 mb-6">{description}</p>
        <DialogTrigger asChild>
          <Button className="w-full h-12">Learn More</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">{title}</h4>
          <p className="mb-4">{details}</p>
          {qrCode && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-600">Scan to book appointment:</p>
              <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;
