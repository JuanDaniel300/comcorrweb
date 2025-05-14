"use client"

import Link from "next/link"
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { AiOutlineGoogle } from "react-icons/ai"
import { FaFacebookF } from "react-icons/fa"

export default function RegisterStep1({ handle }: { handle: (step: number, ignoreValid?: boolean) => void }) {
    const {
        register,
        formState: { errors, isValid },
    } = useFormContext()

    return (
        <>
            <div className="text-2xl font-bold pt-6 mb-6">
                Tu Hogar Merece lo Mejor,
                <br />
                Empieza Aquí
            </div>

            <div className="w-full mb-6 space-y-4">
                {/* Nombre */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Nombre Completo</label>
                    <input
                        {...register("nombre", { required: "Campo obligatorio" })}
                        className={`border-2 ${errors.nombre ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        placeholder="Nombre Apellido"
                    />
                    {errors.nombre && <span className="text-red-500 text-xs mt-1">{String(errors.nombre.message)}</span>}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Correo</label>
                    <input
                        {...register("email", {
                            required: "Campo obligatorio",
                            pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" },
                        })}
                        className={`border-2 ${errors.email ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        placeholder="usuario@correo.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{String(errors.email.message)}</span>}
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Contraseña</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Campo obligatorio",
                            minLength: { value: 4, message: "Mínimo 4 caracteres" },
                        })}
                        className={`border-2 ${errors.password ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        placeholder="Ingresa tu contraseña"
                    />
                    {errors.password && <span className="text-red-500 text-xs mt-1">{String(errors.password.message)}</span>}
                </div>

                {/* Confirmar Contraseña */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Confirmar Contraseña</label>
                    <input
                        type="password"
                        {...register("confirm_password", {
                            required: "Campo obligatorio",
                            validate: (value, formValues) => value === formValues.password || "Las contraseñas no coinciden",
                        })}
                        className={`border-2 ${errors.confirm_password ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        placeholder="Ingresa nuevamente tu contraseña"
                    />
                    {errors.confirm_password?.message && (
                        <span className="text-red-500 text-xs mt-1">{String(errors.confirm_password.message)}</span>
                    )}
                </div>
            </div>

            <motion.button
                type="button"
                onClick={() => handle(2)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primario hover:bg-primario/90 cursor-pointer text-white rounded-full py-2.5 w-full flex justify-center gap-3 items-center font-medium transition-colors"
            >
                Continuar
            </motion.button>

            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-claro2"></div>
                <span className="mx-4 text-oscuro2">O</span>
                <div className="flex-grow border-t border-claro2"></div>
            </div>

            <div className="space-y-3 w-full">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-claro2 text-oscuro1 rounded-lg py-2.5 w-full flex justify-center gap-3 items-center font-medium hover:bg-claro1 transition-colors"
                >
                    <AiOutlineGoogle size={20} className="text-red-500" />
                    Registrate con Google
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-claro2 text-oscuro1 rounded-lg py-2.5 w-full flex justify-center gap-3 items-center font-medium hover:bg-claro1 transition-colors"
                >
                    <FaFacebookF size={20} className="text-blue-600" />
                    Registrate con Facebook
                </motion.button>
            </div>

            <div className="w-full text-sm text-center my-5 text-oscuro2">
                ¿Ya tienes cuenta?{" "}
                <Link href="/Login" className="text-primario font-semibold hover:underline">
                    Inicia sesión aquí.
                </Link>
            </div>
        </>
    )
}
