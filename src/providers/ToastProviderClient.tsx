"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
  FaShoppingCart,
  FaTag,
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { useRouter } from "nextjs-toploader/app";

// Toast types
export type ToastType = "success" | "error" | "info" | "cart" | "promo";

// Product interface for cart toast
export interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity?: number;
}

// Toast interface
export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  product?: Product; // For cart toasts
}

// Context interface
interface ToastContextProps {
  toasts: Toast[];
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  cart: (product: Product, duration?: number) => void;
  promo: (title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

// Create context
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Provider props
interface ToastProviderProps {
  children: ReactNode;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

// Toast Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add toast
  const addToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration = 5000,
      product?: Product
    ) => {
      const id = Date.now().toString();
      const newToast = { id, type, title, message, duration, product };
      setToasts((prevToasts) => [...prevToasts, newToast]);

      // Auto remove toast after duration
      setTimeout(() => {
        removeToast(id);
      }, duration);

      return id;
    },
    []
  );

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Toast type helpers
  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast("success", title, message, duration);
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast("error", title, message, duration);
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast("info", title, message, duration);
    },
    [addToast]
  );

  const cart = useCallback(
    (product: Product, duration?: number) => {
      return addToast(
        "cart",
        "Agregaste a tu carrito",
        undefined,
        duration,
        product
      );
    },
    [addToast]
  );

  const promo = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast("promo", title, message, duration);
    },
    [addToast]
  );

  // Context value
  const contextValue: ToastContextProps = {
    toasts,
    success,
    error,
    info,
    cart,
    promo,
    removeToast,
  };

  // Position styles
  const getPositionStyle = () => {
    switch (position) {
      case "top-right":
        return { top: "1rem", right: "1rem" };
      case "top-left":
        return { top: "1rem", left: "1rem" };
      case "bottom-right":
        return { bottom: "1rem", right: "1rem" };
      case "bottom-left":
        return { bottom: "1rem", left: "1rem" };
      case "top-center":
        return { top: "1rem", left: "50%", transform: "translateX(-50%)" };
      case "bottom-center":
        return { bottom: "1rem", left: "50%", transform: "translateX(-50%)" };
      default:
        return { top: "1rem", right: "1rem" };
    }
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          ...getPositionStyle(),
        }}
      >
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Format price with commas
const formatPrice = (price: number) => {
  return price.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Individual Toast component
interface ToastComponentProps {
  toast: Toast;
  onClose: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onClose }) => {
  const router = useRouter();
  const { type, title, message, duration = 5000, product } = toast;
  const [progress, setProgress] = useState(100);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  // Handle cart actions
  const handleViewCart = () => {
    console.log("View cart clicked");
    // Navigate to cart page
    router.push("/Shopping-cart");
  };

  const handleRemoveItem = () => {
    console.log("Remove item clicked");
    onClose();
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Render cart toast
  if (type === "cart" && product) {
    return (
      <div
        style={{
          background: "white",
          color: "#1a1a1a",
          borderRadius: "1rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "35rem",
          overflow: "hidden",
          transition: "opacity 300ms ease-in-out",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontWeight: "bold", margin: 0 }} className="text-sm">
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              color: "#dc2626",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Product image */}
          <div
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product details */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#6b7280",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
              className="text-sm"
            >
              {product.brand}
            </div>
            <div
              style={{ fontWeight: "500", marginBottom: "0.5rem" }}
              className="text-sm"
            >
              {product.name}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Delete button */}
              <button
                onClick={handleRemoveItem}
                style={{
                  color: "#dc2626",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.25rem",
                }}
              >
                <FaTrash size={16} />
              </button>

              {/* Quantity controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={handleDecreaseQuantity}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0.5rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <FaMinus size={12} />
                </button>
                <div
                  style={{
                    padding: "0.25rem 0.5rem",
                    minWidth: "2rem",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </div>
                <button
                  onClick={handleIncreaseQuantity}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0.5rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <div style={{ fontWeight: "bold" }} className="text-sm">
            ${formatPrice(product.price)}
          </div>
        </div>

        {/* View cart button */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleViewCart}
            className="text-sm px-5 py-[7px] rounded-2xl"
            style={{
              background: "#002684",
              color: "white",
              border: "none",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <FaShoppingCart size={16} />
            Ver mi carrito
          </button>
        </div>
      </div>
    );
  }

  // Toast styles based on type for regular toasts
  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          background: "#002684", // Mcorr blue
          color: "white",
          progressColor: "#4ade80", // green-400
          icon: <FaCheckCircle size={22} />,
        };
      case "error":
        return {
          background: "#dc2626", // red-600
          color: "white",
          progressColor: "white",
          icon: <FaExclamationCircle size={22} />,
        };
      case "info":
        return {
          background: "#002684", // Mcorr blue
          color: "white",
          progressColor: "#93c5fd", // blue-300
          icon: <FaInfoCircle size={22} />,
        };
      case "promo":
        return {
          background: "#dc2626", // red-600
          color: "white",
          progressColor: "#fcd34d", // yellow-300
          icon: <FaTag size={22} />,
        };
      default:
        return {
          background: "#002684", // Mcorr blue
          color: "white",
          progressColor: "#93c5fd", // blue-300
          icon: <FaInfoCircle size={22} />,
        };
    }
  };

  const styles = getStyles();

  // Regular toast
  return (
    <div
      style={{
        background: styles.background,
        color: styles.color,
        borderRadius: "0.5rem",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        width: "100%",
        maxWidth: "24rem",
        overflow: "hidden",
        transition: "opacity 300ms ease-in-out",
      }}
    >
      <div style={{ position: "relative", padding: "1rem" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            color: "rgba(255, 255, 255, 0.7)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
          }}
        >
          <FaTimes size={16} />
        </button>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ marginRight: "0.75rem" }}>{styles.icon}</div>
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", margin: 0 }}>
              {title}
            </h3>
            {message && (
              <p
                style={{
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                  opacity: 0.9,
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "4px", background: "rgba(0, 0, 0, 0.2)" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: styles.progressColor,
            transition: "width 100ms linear",
          }}
        />
      </div>
    </div>
  );
};
