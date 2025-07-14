"use client";

import { useState, useMemo, Fragment } from "react";
import { motion } from "framer-motion";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize, formatCurrency } from "@/utils/generic";
import ProductCard from "@/components/productCard/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "../Breadcrumbs/breadCrumbs";
import { Product } from "@/types/product.type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProductCardSkeleton = () => {
  return (
    <div className="">
      <Card className="h-full overflow-hidden border border-claro2 w-[300px]">
        <CardContent className="p-4">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-3 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-3 w-1/2 mb-4" />
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-10 w-full mt-3" />
        </CardContent>
      </Card>
    </div>
  );
};

// Available types
const TYPES = ["Automático", "Manual"];

// Available promotions
const PROMOTIONS = ["Promo 1", "Promo 2"];

// Price range limits
const MIN_PRICE = -10;
const MAX_PRICE = 20000;

export default function ProductGrid({
  products,
  totalPages,
  title,
  Breadcrumb,
  loading = true,
}: {
  products: Product[];
  totalPages?: number;
  totalRecords?: number;
  title: string;
  Breadcrumb: { title: string; link: string }[];
  loading?: boolean;
}) {
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [sortOption, setSortOption] = useState("lowToHigh");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);

  const BRANDS = Array.from(new Set(products.map((p) => p.marca)));

  // Filtrado y ordenamiento con productos adaptados
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products
      .filter((product) => {
        // Filtro de precio
        if (
          product.precio1 < priceRange[0] ||
          product.precio1 > priceRange[1]
        ) {
          return false;
        }

        // Filtro de marca
        if (
          selectedBrands.length > 0 &&
          !selectedBrands.includes(product.marca)
        ) {
          return false;
        }

        // Filtro de tipo simulado (usando categoría como ejemplo)
        if (selectedTypes.length > 0) {
          const isAutomatic = product.categoria.toLowerCase().includes("auto");
          if (
            (selectedTypes.includes("Automático") && !isAutomatic) ||
            (selectedTypes.includes("Manual") && isAutomatic)
          ) {
            return false;
          }
        }

        // Filtro de promociones simulado (e.g. si tiene imagen2 => "Promo 1")
        if (
          selectedPromotions.length > 0 &&
          ((selectedPromotions.includes("Promo 1") && !product.imagen2) ||
            (selectedPromotions.includes("Promo 2") &&
              (!product.imagen3 || !product.imagen1)))
        ) {
          return false;
        }

        // Filtro por existencia
        if (inStockOnly && product.existencia <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "lowToHigh":
            return a.precio1 - b.precio1;
          case "highToLow":
            return b.precio1 - a.precio1;
          case "bestSellers":
            return a.clave.localeCompare(b.clave); // simulado
          case "newest":
            return b.codigo.localeCompare(a.codigo); // simulado
          default:
            return 0;
        }
      });
  }, [
    products,
    priceRange,
    sortOption,
    selectedBrands,
    selectedTypes,
    selectedPromotions,
    inStockOnly,
  ]);

  // Checkbox handlers
  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handlePromotionChange = (promo: string, checked: boolean) => {
    setSelectedPromotions((prev) =>
      checked ? [...prev, promo] : prev.filter((p) => p !== promo)
    );
  };

  return (
    <div className="min-h-screen pt-10 sm:pt-15 bg-claro1">
      <div className="container mx-auto py-10 px-5 sm:px-0">
        {/* Breadcrumb */}
        <div className="pb-5">
          <Breadcrumbs Breadcrumbs={Breadcrumb} />
        </div>

        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-64 h-max shrink-0 bg-white  rounded-2xl hidden sm:block  sticky right-0 top-[150px]"
          >
            <Card className="border-claro2 bg-claro100">
              <CardContent className="px-6">
                <h2 className="text-xl font-bold text-primario mb-6">
                  Filtros
                </h2>

                {/* Sort Options */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">
                    Ordenar por
                  </h3>
                  <RadioGroup value={sortOption} onValueChange={setSortOption}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="lowToHigh"
                          id="lowToHigh"
                          className="text-primario"
                        />
                        <Label htmlFor="lowToHigh" className="text-oscuro2">
                          Precio (menor a mayor)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="highToLow"
                          id="highToLow"
                          className="text-primario"
                        />
                        <Label htmlFor="highToLow" className="text-oscuro2">
                          Precio (mayor a menor)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bestSellers"
                          id="bestSellers"
                          className="text-primario"
                        />
                        <Label htmlFor="bestSellers" className="text-oscuro2">
                          Más vendidos
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="newest"
                          id="newest"
                          className="text-primario"
                        />
                        <Label htmlFor="newest" className="text-oscuro2">
                          Novedades
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Price Range with dual-handle slider */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">Precio</h3>
                  <div className="text-center mb-4">
                    <span className="text-primario font-medium">
                      {formatCurrency(priceRange[0])}
                    </span>
                    <span className="text-oscuro2"> - </span>
                    <span className="text-primario font-medium">
                      {formatCurrency(priceRange[1])}
                    </span>
                  </div>

                  {/* Custom styled slider with two handles */}
                  <div className="relative py-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-claro2 rounded-full"></div>
                    </div>
                    <div
                      className="absolute inset-0 flex items-center"
                      style={{
                        left: `${
                          ((priceRange[0] - MIN_PRICE) /
                            (MAX_PRICE - MIN_PRICE)) *
                          100
                        }%`,
                        right: `${
                          100 -
                          ((priceRange[1] - MIN_PRICE) /
                            (MAX_PRICE - MIN_PRICE)) *
                            100
                        }%`,
                      }}
                    >
                      <div className="h-1 w-full  rounded-full"></div>
                    </div>
                    <Slider
                      defaultValue={[MIN_PRICE, MAX_PRICE]}
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="relative z-10 "
                    />
                  </div>

                  <div className="flex justify-between text-xs text-oscuro3 mt-2">
                    <span>{formatCurrency(MIN_PRICE)}</span>
                    <span>{formatCurrency(MAX_PRICE)}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">
                    Disponibilidad
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) =>
                        setInStockOnly(checked as boolean)
                      }
                      className="border-claro2"
                    />
                    <Label htmlFor="inStock" className="text-oscuro2">
                      En Stock
                    </Label>
                  </div>
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">Marca</h3>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) =>
                            handleBrandChange(brand, checked as boolean)
                          }
                          className=" border-claro2"
                        />
                        <Label
                          htmlFor={`brand-${brand}`}
                          className="text-oscuro2"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discounts */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">
                    Descuentos o Promociones
                  </h3>
                  <div className="space-y-2">
                    {PROMOTIONS.map((promo) => (
                      <div key={promo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`promo-${promo}`}
                          checked={selectedPromotions.includes(promo)}
                          onCheckedChange={(checked) =>
                            handlePromotionChange(promo, checked as boolean)
                          }
                          className="border-claro2"
                        />
                        <Label
                          htmlFor={`promo-${promo}`}
                          className="text-oscuro2"
                        >
                          {promo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-oscuro1">Tipo</h3>
                  <div className="space-y-2">
                    {TYPES.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleTypeChange(type, checked as boolean)
                          }
                          className=" border-claro2"
                        />
                        <Label
                          htmlFor={`type-${type}`}
                          className="text-oscuro2"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Filters Button */}
                <Button
                  variant="outline"
                  className="w-full border-primario text-primario hover:bg-primario hover:text-claro100"
                  onClick={() => {
                    setPriceRange([MIN_PRICE, MAX_PRICE]);
                    setSortOption("lowToHigh");
                    setInStockOnly(false);
                    setSelectedBrands([]);
                    setSelectedTypes([]);
                    setSelectedPromotions([]);
                  }}
                >
                  Restablecer filtros
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold text-primario">
                {capitalize(title)}
              </h1>
              <p className="text-oscuro3">
                {loading
                  ? "Cargando..."
                  : `${filteredProducts.length} resultados`}
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-2 place-items-center sm:place-items-stretch justify-center sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] space-y-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <Fragment>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-2 sm:gap-0 place-items-center sm:place-items-stretch justify-center sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] space-y-5"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={index}
                      keyIndex={index}
                      product={product}
                    />
                  ))}
                </motion.div>

                {totalPages && totalPages > 1 && (
                  <PaginationProducts totalPages={totalPages} />
                )}
              </Fragment>
            ) : (
              <div className="text-center py-12 bg-claro100 rounded-lg border border-claro2">
                <h3 className="text-sm sm:text-lg font-medium mb-2 text-oscuro1">
                  No se encontraron productos
                </h3>
                <p className="text-oscuro3 mb-4 text-sm sm:text-base">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
                <Button
                  className="bg-primario hover:bg-primario/90"
                  onClick={() => {
                    setPriceRange([4000, 12000]);
                    setSortOption("lowToHigh");
                    setInStockOnly(false);
                    setSelectedBrands([]);
                    setSelectedTypes([]);
                    setSelectedPromotions([]);
                  }}
                >
                  Restablecer filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const PaginationProducts = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string, 10)
    : 1;

  const handleSearch = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (page <= half) {
      end = Math.min(totalPages, maxPagesToShow);
    }

    if (page + half > totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handleSearch(page - 1);
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <span className="px-2 text-muted-foreground">...</span>
            ) : (
              <PaginationLink
                href="#"
                isActive={page === p}
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(Number(p));
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handleSearch(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
