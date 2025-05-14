"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"

export default function RegisterStep2({
    handle,
    isSubmitting,
}: {
    handle: (step: number, ignoreValid?: boolean) => void
    isSubmitting: boolean
}) {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <>
            <div className="text-2xl font-bold pt-6 mb-6">
                Solo Falta un Paso para Empezar <br />
                a Comprar
            </div>

            <div className="w-full mb-6 space-y-4">
                {/* Fecha de nacimiento */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Fecha de Nacimiento</label>
                    <input
                        {...register("fecha_nacimiento", {
                            required: "La fecha de nacimiento es obligatoria",
                        })}
                        className={`border-2 ${errors.fecha_nacimiento ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        type="date"
                    />
                    {errors.fecha_nacimiento && (
                        <span className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento.message as string}</span>
                    )}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Número de Teléfono</label>
                    <input
                        {...register("phone", {
                            required: "El número de teléfono es obligatorio",
                            pattern: {
                                value: /^[0-9+\s()-]{10,20}$/,
                                message: "Formato de teléfono no válido",
                            },
                        })}
                        className={`border-2 ${errors.phone ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50`}
                        placeholder="+52 123 456 7890"
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message as string}</span>}
                </div>

                {/* Género */}
                <div>
                    <label className="block font-semibold mb-1 text-oscuro1">Género</label>
                    <select
                        {...register("genero", {
                            required: "Selecciona una opción",
                        })}
                        className={`border-2 ${errors.genero ? "border-red-500" : "border-claro2"
                            } w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primario/50 bg-white`}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                        <option value="no_decir">Prefiero no decirlo</option>
                    </select>
                    {errors.genero && <span className="text-red-500 text-xs mt-1">{errors.genero.message as string}</span>}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            {...register("terminos", {
                                required: "Debes aceptar los términos y condiciones",
                            })}
                            className="mt-0.5 rounded border-claro2 text-primario focus:ring-primario/50"
                        />
                        <label className="text-sm text-oscuro2">
                            Acepto los{" "}
                            <a href="#" className="text-primario hover:underline">
                                términos y condiciones
                            </a>
                        </label>
                    </div>
                    {errors.terminos && (
                        <span className="text-red-500 text-xs block">{errors.terminos.message as string}</span>
                    )}

                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            {...register("ofertas")}
                            className="mt-0.5 rounded border-claro2 text-primario focus:ring-primario/50"
                        />
                        <label className="text-sm text-oscuro2">Quiero recibir ofertas y novedades por correo</label>
                    </div>
                </div>
            </div>

            <div className="w-full my-6 flex justify-between gap-4">
                <motion.button
                    type="button"
                    onClick={() => handle(1, true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border border-primario text-primario hover:bg-primario/10 rounded-full py-2.5 font-medium transition-colors"
                >
                    Atrás
                </motion.button>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className={`flex-1 bg-primario hover:bg-primario/90 text-white rounded-full py-2.5 font-medium transition-colors flex justify-center items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                        </>
                    ) : (
                        "Finalizar Registro"
                    )}
                </motion.button>
            </div>
        </>
    )
}
