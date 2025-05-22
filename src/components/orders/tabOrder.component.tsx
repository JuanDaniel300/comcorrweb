"use client";

import { FC } from "react";
import { motion } from "framer-motion";

type TabOrderProps = {
  childrenId: number;
  title: string;
  variants?: "entregado" | "encamino" | "enproceso" | "cancelado" | string;
};

const TabOrder: FC<TabOrderProps> = ({ title }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="w-max py-2 px-4 rounded-lg cursor-pointer border-primario"
    >
      <div className="text-sm text-primario">{title}</div>
    </motion.div>
  );
};

export default TabOrder;
