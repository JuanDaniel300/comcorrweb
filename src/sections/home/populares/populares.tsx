import { getPopulares } from "@/services/populares/populares";
import cache from "memory-cache";

export default async function PopularesSection() {
    let populares = cache.get("populares");

    if (!populares) {
        populares = await getPopulares();

        cache.put("populares", populares, 1000 * 60 * 5);
    }

    console.log(populares)

    return (
        <div>
            <h1>Populares</h1>
        </div>
    )
}