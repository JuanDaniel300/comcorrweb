"use client";
import { images } from "@/constants/generic";

const speed = 20000;

type Marcas = {
  id: number;
};

const SliderMarcasClient = ({ marcas }: { marcas: Marcas[] }) => {
  return (
    <div className="inner-container">
      <div className="wrapper-container">
        {[1, 2, 3].map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="section-slider"
            style={{ "--speed": `${speed}ms` } as React.CSSProperties}
          >
            {marcas.slice(0, 17).map(({ id }, index) => (
              <div
                className="w-[200px] max-h-[100px] flex justify-center items-center mx-auto my-auto"
                key={id}
              >
                <img
                  className="object-contain h-full w-auto max-h-[100px] m-auto"
                  src={images[index]?.path || "/placeholder.png"}
                  alt={`Marca ${id}`}
                />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default SliderMarcasClient;
