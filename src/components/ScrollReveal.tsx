
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

const ScrollReveal = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up", 
  distance = 50,
  ...motionProps 
}: ScrollRevealProps) => {
  
  // Define initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };
  
  // Define animate position (final position)
  const getFinalPosition = () => {
    switch (direction) {
      case "up": 
      case "down": return { opacity: 1, y: 0 };
      case "left":
      case "right": return { opacity: 1, x: 0 };
      case "none": return { opacity: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
