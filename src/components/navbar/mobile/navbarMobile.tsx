import { Input } from "@/components/ui/input";

export default function NavbarMobile() {
  return (
    <div className="bg-white border p-4">
      <div className="w-full flex gap-4  items-center align-middle justify-between">
        {/* Menu hamburguesa */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-logs-icon lucide-logs"
          >
            <path d="M13 12h8" />
            <path d="M13 18h8" />
            <path d="M13 6h8" />
            <path d="M3 12h1" />
            <path d="M3 18h1" />
            <path d="M3 6h1" />
            <path d="M8 12h1" />
            <path d="M8 18h1" />
            <path d="M8 6h1" />
          </svg>
        </div>

        {/* logo */}
        <div>
          <img
            src="http://comcorr.com.mx/logo.png"
            className="object-cover"
            alt=""
          />
        </div>

        {/* Buscador */}
        <div className="flex-1 mx-2">
          <Input className="bg-gray-200 shadow-none rounded-2xl focus:outline-none text-sm" />
        </div>

        {/* Carrito de compras */}
        <div className="flex items-center align-middle gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <div className="rounded-full bg-primario text-white px-2 py-1">0</div>
        </div>
      </div>
    </div>
  );
}
