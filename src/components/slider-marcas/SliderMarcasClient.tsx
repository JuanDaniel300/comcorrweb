import { images } from "@/constants/generic";

const speed = 20000;

type Marcas = {
  id: number;
};

const SliderMarcasClient = ({ marcas }: { marcas: Marcas[] }) => {
  return (
    <div className="inner-container">
      <div className="wrapper-container">
        {[1, 2, 3].map(() => (
          <section
            key={Math.random()}
            className="section-slider"
            style={{ "--speed": `${speed}ms` } as React.CSSProperties}
          >
            {marcas.map(({ id }: { id: number }, index: number) => (
              <div
                className="w-[200px] max-h-[100px]  flex justify-center items-center mx-auto my-auto"
                key={id}
              >
                <img
                  className="object-contain h-full w-auto max-h-[100px] m-auto"
                  src={images[index]?.path}
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
