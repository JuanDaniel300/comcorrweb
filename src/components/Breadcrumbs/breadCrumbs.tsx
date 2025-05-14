"use client";

import { motion } from "framer-motion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbsProps = {
    title: string;
    link: string;
}
export default function Breadcrumbs({ Breadcrumbs }: { Breadcrumbs: BreadcrumbsProps[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=""
        >
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/"
                            className="text-oscuro1 text-sm font-[500] text-[#757474] hover:text-[#262626] underline"
                        >
                            Inicio
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    {
                        Breadcrumbs.map((item, index) => (
                            <>
                                <BreadcrumbItem key={index}>
                                    {
                                        index === Breadcrumbs.length - 1 ? (
                                            <BreadcrumbPage className=" text-sm font-[500] ">
                                                {item.title}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                key={index}
                                                href={item.link}
                                                className=" text-sm font-[500] text-[#757474] hover:text-[#262626] underline"
                                            >
                                                {item.title}
                                            </BreadcrumbLink>
                                        )
                                    }

                                </BreadcrumbItem>

                                {index !== Breadcrumbs.length - 1 && <BreadcrumbSeparator />}

                            </>
                        ))


                    }


                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>
    )
}