import { motion } from "framer-motion";
import { useState } from "react";
import { BiCheckCircle, BiX } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

type AlertType = "error" | "success" | "info" | "warning";

interface AlertProps {
  message: string;
  type?: AlertType;
  dismissible?: boolean;
  className?: string;
}

export default function Alert({
  message,
  type = "error",
  dismissible = false,
  className = ""
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const alertStyles = {
    error: "bg-red-100 text-red-600 border-red-200",
    success: "bg-green-100 text-green-600 border-green-200",
    info: "bg-blue-100 text-blue-600 border-blue-200",
    warning: "bg-yellow-100 text-yellow-600 border-yellow-200"
  };

  const AlertIcon = () => {
    switch (type) {
      case "error":
        return <FiAlertCircle className="h-5 w-5" />;
      case "success":
        return <BiCheckCircle className="h-5 w-5" />;
      case "warning":
        return <FiAlertTriangle className="h-5 w-5" />;
      case "info":
        return <BsInfo className="h-5 w-5" />;
      default:
        return <FiAlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.3 }}
      className={`flex items-center border px-4 py-3 rounded-md mb-4 ${alertStyles[type]} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">
        <AlertIcon />
      </div>
      <div className="flex-grow text-sm font-medium">
        {message}
      </div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
          aria-label="Close alert"
        >
          <BiX className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}