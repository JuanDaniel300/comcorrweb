const NavbarCategoriesSkeleton = () => {
    return (
        <div className="w-full bg-navbarCategories">
            <div className="container px-20 text-white mx-auto flex justify-between py-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="relative">
                        {/* Skeleton de la categoría principal */}
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>

                        {/* Skeleton de las subcategorías */}
                        <div className="hidden absolute left-0 mt-3 bg-white border border-gray-200 text-black rounded-b-lg shadow-lg overflow-hidden w-40">
                            {Array.from({ length: 3 }).map((_, subIndex) => (
                                <div
                                    key={subIndex}
                                    className="w-full h-4 bg-gray-200 animate-pulse my-2 mx-auto rounded-md"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavbarCategoriesSkeleton;
