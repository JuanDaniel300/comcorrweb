"use client";

import { motion } from "motion/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginRequest } from "@/services/auth/authService";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import Alert from "@/components/ui/alert";


const AuthView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    //   const signIn = useSignIn();

    const email = watch("email");
    const password = watch("password");

    useEffect(() => {
        if (errorMessage && (email || password)) {
            setErrorMessage("");
        }
    }, [email, password]);



    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const token = await loginRequest(data);

            if (!token) {
                throw new Error("No se recibió token del servidor.");
            }

            //   const auth = signIn({
            //     auth: {
            //       token,
            //       type: "Bearer",
            //     },
            //     userState: { user: "Usuario Demo", type: "authenticated" },
            //   });

            //   if (auth) {
            //     window.location.replace("/");
            //   } else {
            //     setErrorMessage("Hubo un problema al iniciar sesión.");
            //   }
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Error desconocido."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            layout
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="rounded-xl p-6 bg-white w-[544px] h-max m-auto shadow-md"
        >
            {/* Logo */}
            <div className="flex items-center w-max me-auto">
                <Link href="/">
                    <img src="/logo.svg" className="object-cover" alt="Logo" />
                </Link>
            </div>

            <motion.div
                key={1}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full"
            >
                <div className="text-2xl font-semibold py-6">
                    Nos alegra verte otra vez
                </div>

                <div className="font-[600] pr-20 text-oscuro2">
                    Inicia sesión para acceder a tu cuenta, gestionar tus pedidos y
                    disfrutar de una mejor experiencia de compra.
                </div>

                {errorMessage && (
                    <Alert message={errorMessage} className="mt-3" type="error" />
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full my-6">
                    {/* Email */}
                    <div className="mb-3 flex flex-wrap">
                        <label htmlFor="email" className="w-full font-semibold mb-2">
                            Correo
                        </label>
                        <input
                            className="border-2 border-gray-200 w-full rounded-lg px-2 py-2"
                            placeholder="usuario@correo.com"
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Correo inválido",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                {typeof errors.email.message === "string" && errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3 flex flex-wrap">
                        <label htmlFor="password" className="w-full font-semibold mb-2">
                            Contraseña
                        </label>
                        <input
                            className="border-2 border-gray-200 w-full rounded-lg px-2 py-2"
                            placeholder="Ingresa tu contraseña"
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                {typeof errors.password.message === "string" && errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Remember me and reset password */}
                    <div className="w-full flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-sm text-gray-700">
                                Recordarme
                            </label>
                        </div>

                        <Link
                            href="/reset-password"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Button login */}
                    <div className="w-full my-6">
                        <Button
                            title="Iniciar sesión"
                            size="lg"
                            type="submit"
                            variants="primary"
                            isLoading={isLoading}
                            disabled={isLoading}
                            className="my-2"
                        />

                    </div>
                </form>

                {/* Register Link */}
                <div className="w-full text-xs text-center my-5">
                    ¿Aún no tienes cuenta?{" "}
                    <Link
                        href="/Register"
                        className="text-primario font-semibold hover:underline cursor-pointer"
                    >
                        Regístrate aquí
                    </Link>{" "}
                    y disfruta de todos los beneficios.
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-600">O</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google and Facebook */}
                <div className="space-y-4 w-full">
                    <motion.button className="bg-white border cursor-pointer border-gray-300 text-gray-700 rounded-lg py-2 w-full flex justify-center gap-3 items-center">
                        <AiOutlineGoogle size={20} />
                        Iniciar sesión con Google
                    </motion.button>

                    <motion.button className="bg-white border cursor-pointer border-gray-300 text-gray-700 rounded-lg py-2 w-full flex justify-center gap-3 items-center">
                        <FaFacebookF size={20} />
                        Iniciar sesión con Facebook
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthView;