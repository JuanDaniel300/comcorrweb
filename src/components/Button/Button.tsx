import { motion } from "framer-motion";
import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type ButtonProps = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variants?: "primary" | "outline" | "outlineGrey";
  icon?: JSX.Element;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const getVariantStyles = (
  variant: "primary" | "outline" | "outlineGrey" = "primary"
) => {
  const base = {
    primary: {
      styles: "bg-primario text-white font-medium",
      hover: { background: "var(--degradadoPrimario)" },
    },
    outline: {
      styles: "border border-primario text-primario bg-transparent",
      hover: { boxShadow: "0px 0px 0px 2px var(--primario)" },
    },
    outlineGrey: {
      styles: "border border-gray-300 text-gray-700 bg-transparent font-medium",
      hover: { boxShadow: "0px 0px 0px 1px #3998f6" },
    },
  };

  return base[variant] || base["primary"];
};

const getSizeStyles = (size: "sm" | "md" | "lg" = "md") => {
  const sizes = {
    sm: "text-xs py-1 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };
  return sizes[size] || sizes["md"];
};

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  className = "",
  variants = "primary",
  icon,
  type = "button",
  isLoading = false,
  disabled = false,
  size = "md",
}) => {
  const { styles, hover } = getVariantStyles(variants);
  const sizeStyles = getSizeStyles(size);

  const baseStyles =
    "rounded-full w-full flex justify-center items-center gap-2 transition-all";

  return (
    <div className="w-full">
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? hover : {}}
        className={`
          ${baseStyles}
          ${styles}
          ${sizeStyles}
          ${
            disabled || isLoading
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer"
          }
          ${className}
        `}
        aria-disabled={disabled || isLoading}
      >
        {isLoading ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          <>
            {icon && icon}
            <span>{title}</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default Button;
