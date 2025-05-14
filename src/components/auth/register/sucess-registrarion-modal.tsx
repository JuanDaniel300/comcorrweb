"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCheckCircle, FaShoppingCart, FaTag, FaPercent, FaTruck } from "react-icons/fa"
import { MdLocalOffer, MdSupportAgent } from "react-icons/md"
import { RiSecurePaymentLine } from "react-icons/ri"

interface SuccessRegistrationModalProps {
    isOpen: boolean
    onClose: () => void
    userName?: string
}

export default function SuccessRegistrationModal({ isOpen, onClose, userName }: SuccessRegistrationModalProps) {
    useEffect(() => {
        if (isOpen) {
            // Lock body scroll when modal is open
            document.body.style.overflow = "hidden"

            return () => {
                // Restore body scroll when modal is closed
                document.body.style.overflow = "auto"
            }
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Success header */}
                        <div className="bg-gradient-to-r from-primario to-primario/80 p-6 text-white text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                className="inline-block bg-white rounded-full p-3 mb-4"
                            >
                                <FaCheckCircle className="text-green-500" size={40} />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold mb-2"
                            >
                                ¡Registro Exitoso!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/90"
                            >
                                {userName ? `¡Bienvenido/a ${userName}!` : "¡Bienvenido/a a nuestra tienda!"}
                            </motion.p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-center mb-6"
                            >
                                <h3 className="text-xl font-semibold text-oscuro1 mb-2">Tu cuenta ha sido creada correctamente</h3>
                                <p className="text-oscuro2">
                                    Ahora puedes disfrutar de todos los beneficios exclusivos y comenzar a comprar los mejores productos
                                    para tu hogar.
                                </p>
                            </motion.div>

                            {/* Benefits */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-2 gap-4 mb-6"
                            >
                                <BenefitItem icon={<RiSecurePaymentLine size={24} />} text="Compra Fácil y Segura" delay={0.7} />
                                <BenefitItem icon={<MdSupportAgent size={24} />} text="Soporte 24/7" delay={0.8} />
                                <BenefitItem icon={<MdLocalOffer size={24} />} text="Promociones Exclusivas" delay={0.9} />
                                <BenefitItem icon={<FaPercent size={24} />} text="Descuentos Especiales" delay={1.0} />
                            </motion.div>

                            {/* First purchase offer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center"
                            >
                                <div className="bg-orange-100 rounded-full p-2 mr-4">
                                    <FaTag className="text-orange-500" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-oscuro1">¡Regalo de bienvenida!</h4>
                                    <p className="text-sm text-oscuro2">
                                        Usa el código <span className="font-bold text-orange-500">BIENVENIDO10</span> para obtener 10% de
                                        descuento en tu primera compra
                                    </p>
                                </div>
                            </motion.div>

                            {/* Action buttons */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 cursor-pointer bg-primario hover:bg-primario/90 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                    onClick={onClose}
                                >
                                    <FaShoppingCart size={18} />
                                    Empezar a Comprar
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Delivery info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-center gap-3 text-oscuro2"
                        >
                            <FaTruck size={20} />
                            <span>Envíos gratis en compras mayores a $5,000</span>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// Benefit item component
function BenefitItem({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
        >
            <div className="text-primario">{icon}</div>
            <span className="text-sm font-medium text-oscuro1">{text}</span>
        </motion.div>
    )
}
