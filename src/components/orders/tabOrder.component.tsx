"use client";

import { motion } from "framer-motion";

interface TabOrderProps {
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

const TabOrder: React.FC<TabOrderProps> = ({ title, onClick, isActive }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`px-4 py-2 rounded-lg border text-sm font-medium relative overflow-hidden cursor-pointer ${isActive
        ? "bg-primario text-white"
        : "bg-white text-primario border-primario"
        }`}
    >
      {title}


    </motion.button>
  );
};

export default TabOrder;
