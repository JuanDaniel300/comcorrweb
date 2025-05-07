import { getRecomendados } from "@/services/recomendados/recomendados";
import cache from "memory-cache";

export default async function RecomendadosSection() {
    let recomendados = cache.get("recomendados");

    if (!recomendados) {
        recomendados = await getRecomendados();

        cache.put("recomendados", recomendados, 1000 * 60 * 5);
    }

    console.log(recomendados)
    return (
        <div>
            <h1>Recomendados section</h1>
        </div>
    )
}