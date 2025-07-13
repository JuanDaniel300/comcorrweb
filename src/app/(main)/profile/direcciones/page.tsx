"use client"
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import AddressSelector from "@/components/shopping-cart/addressSelector";
import { Fragment } from "react";
import { motion } from "motion/react";

export default function Page() {
    return (
        <Fragment>
            <div className="mb-5">
                <Breadcrumbs
                    Breadcrumbs={[
                        { title: "Perfil", link: "/profile" },
                        { title: "Direcciones", link: "" },
                    ]}
                />


            </div>
            <h1 className="font-semibold text-3xl mb-5">Mis direcciónes</h1>

            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <p className="font-[500]">Elige una dirección guardada o agrega una nueva</p>
                </motion.div>
                <AddressSelector />

            </div>
        </Fragment>
    )
}