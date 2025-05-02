import { FaFacebookF } from "react-icons/fa";
import "./footer.component.css";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";

const Footer = () => {
    return (
        <div className="w-full bg-footer">
            <div className="text-white h-full container mx-auto p-20">
                <div className="grid grid-cols-4 pb-10">
                    {/* Logo and social media */}
                    <div className="flex flex-wrap justify-between gap-10">
                        <div className="w-full">
                            <img src="/logo.svg" className="h-[80px] object-center" alt="" />
                        </div>
                        <div className="w-full flex gap-10">
                            <div className="rounded-full bg-primario h-max w-max p-3">
                                <FaFacebookF color="white" />
                            </div>
                            <div className="rounded-full bg-primario h-max w-max p-3">
                                <RiInstagramFill color="white" />
                            </div>
                            <div className="rounded-full bg-primario h-max w-max p-3">
                                <RiWhatsappFill color="white" />
                            </div>
                        </div>
                    </div>
                    {/* Enlaces Utiles */}
                    <div>
                        <div className="text-primario font-semibold mb-5">
                            Enlaces Útiles
                        </div>

                        <div className="space-y-3">
                            <div className="text-oscuro100 text-sm hover:underline">
                                Inicio
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Carrito
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Sobre Nosotros
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Iniciar Sesión
                            </div>
                        </div>
                    </div>
                    {/* Categorias */}
                    <div>
                        <div className="text-primario font-semibold mb-5">Categorias</div>

                        <div className="space-y-3">
                            <div className="text-oscuro100 text-sm hover:underline">
                                Línea Blanca
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Electrodomésticos
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Aire Acondicionado
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Electrónica
                            </div>
                            <div className="text-oscuro100 text-sm hover:underline">
                                Muebles
                            </div>
                        </div>
                    </div>
                    {/* Contacto */}
                    <div>
                        <div className="text-primario font-semibold mb-5">Contacto</div>

                        <div className="space-y-3">
                            <div className="text-oscuro100 text-sm ">
                                Teléfono: 123-456-7890
                            </div>
                            <div className="text-oscuro100 text-sm ">ejemplo@comcorr.com</div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-oscuro100 text-center pt-10 border-t border-gray-200">
                    Copyright © Todos los derechos reservados
                </div>
            </div>
        </div>
    );
};

export default Footer;
