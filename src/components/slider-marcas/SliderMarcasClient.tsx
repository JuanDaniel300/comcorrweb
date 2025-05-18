"use client";
import { images } from "@/constants/generic";

const speed = 20000;

type Marcas = {
  id: number;
  imagen: string;
};

const SliderMarcasClient = ({ marcas }: { marcas: Marcas[] }) => {


  return (
    <div className="inner-container">
      <div className="wrapper-container">
        {[1, 2, 3].map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="section-slider gap-2"
            style={{ "--speed": `${speed}ms` } as React.CSSProperties}
          >
            {marcas.slice(0, 17).map(({ id, imagen }, index) => (

              <div
                className="w-[200px] h-[80px] flex justify-center items-center mx-auto my-auto "
                key={id}
              >
                <img
                  className="object-scale-down h-full w-full  m-auto"
                  src={imagen || images[index]?.path}
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
