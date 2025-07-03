"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";

import { CgShoppingBag } from "react-icons/cg";
import { CiDiscount1 } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import RegisterStep1 from "@/components/auth/register/Step1";
import RegisterStep2 from "@/components/auth/register/Step2";
import SuccessRegistrationModal from "@/components/auth/register/sucess-registrarion-modal";

export default function RegisterView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const methods = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Mock API call - replace with your actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              token: "mock-token-12345",
              user: {
                id: 1,
                name: data.nombre,
                email: data.email,
              },
            },
          });
        }, 1500);
      });

      console.log("Respuesta del registro:", response);

      // Handle authentication - replace with your auth method
      // For example with next-auth or a custom auth solution
      localStorage.setItem("user", JSON.stringify((response as any).data.user));
      localStorage.setItem("token", (response as any).data.token);

      setShowModal(true);
    } catch (error: any) {
      console.error("Error al registrar:", error.message);
      // Add toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async (nextStep: number, ignoreValid = false) => {
    if (ignoreValid || (await methods.trigger())) {
      setStep(nextStep);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 w-full min-h-screen">
      <div className="flex-1 w-full md:w-[50%] h-full m-auto flex items-center justify-center md:justify-end p-4">
        <motion.div
          layout
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="rounded-xl p-6 bg-white w-full max-w-md md:max-w-lg shadow-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-between w-full mb-4">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" className="h-10 object-contain" alt="Logo" />
            </Link>

            <div className="text-xl text-secundario font-semibold">
              {step}/2
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full"
            >
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {step === 1 && <RegisterStep1 handle={handleNextStep} />}
                  {step === 2 && (
                    <RegisterStep2
                      handle={handleNextStep}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </form>
              </FormProvider>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full md:w-[50%] flex-1 h-full m-auto flex items-center bg-transparent p-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="w-full">
            <div className="text-xl font-semibold">
              Únete a nuestra comunidad y accede a beneficios exclusivos.
              <br />
              Comprar para tu hogar nunca había sido tan fácil
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="text-primario font-semibold text-2xl mb-4">
              Beneficios
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-4 bg-white border border-claro2 p-5 rounded-xl shadow-sm"
              >
                <div className="text-secundario">
                  <CgShoppingBag size={30} />
                </div>
                <div className="text-primario font-semibold">
                  Compra Fácil y Segura
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 bg-white border border-claro2 p-5 rounded-xl shadow-sm"
              >
                <div className="text-secundario">
                  <MdPhoneInTalk size={30} />
                </div>
                <div className="text-primario font-semibold">Soporte 24/7</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4 bg-white border border-claro2 p-5 rounded-xl shadow-sm"
              >
                <div className="text-secundario">
                  <CiDiscount1 size={30} />
                </div>
                <div className="text-primario font-semibold">
                  Promociones Exclusivas
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4 bg-white border border-claro2 p-5 rounded-xl shadow-sm"
              >
                <div className="text-secundario">
                  <RiMoneyDollarCircleLine size={30} />
                </div>
                <div className="text-primario font-semibold">
                  Opciones de Pago
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <SuccessRegistrationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push("/");
        }}
        userName={methods.getValues("nombre")}
      />
    </div>
  );
}
