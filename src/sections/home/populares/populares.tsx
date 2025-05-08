import { getPopulares } from "@/services/populares/populares";

export default async function PopularesSection() {
    const populares = await getPopulares();

    return (
        <div>
            <h1>Populares</h1>

            {populares?.promos?.length}
        </div>
    )
}