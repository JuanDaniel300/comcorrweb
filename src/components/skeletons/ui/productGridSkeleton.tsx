import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductGridSkeleton() {
    return (
        <div className="min-h-screen pt-15 bg-claro1">
            <div className="container mx-auto py-10">
                {/* Breadcrumb Skeleton */}
                <div className="pb-5">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filters Sidebar Skeleton - Everything as skeletons */}
                    <div className="w-full md:w-64 h-max shrink-0 bg-white rounded-2xl sticky right-0 top-[150px]">
                        <Card className="border-claro2 bg-claro100">
                            <CardContent className="px-6">
                                {/* Filters Title Skeleton */}
                                <Skeleton className="h-7 w-24 mb-6" />

                                {/* Sort Options Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-28 mb-3" />
                                    <div className="space-y-3">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <Skeleton className="h-4 w-4 rounded-full" />
                                                <Skeleton className="h-4 w-40" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-20 mb-3" />
                                    <div className="text-center mb-4">
                                        <Skeleton className="h-5 w-32 mx-auto" />
                                    </div>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>

                                {/* Availability Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-32 mb-3" />
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-4 w-4 rounded-sm" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>

                                {/* Brand Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-16 mb-3" />
                                    <div className="space-y-2">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <Skeleton className="h-4 w-4 rounded-sm" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Discounts Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-48 mb-3" />
                                    <div className="space-y-2">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <Skeleton className="h-4 w-4 rounded-sm" />
                                                <Skeleton className="h-4 w-28" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Section Skeleton */}
                                <div className="mb-6">
                                    <Skeleton className="h-5 w-12 mb-3" />
                                    <div className="space-y-2">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <Skeleton className="h-4 w-4 rounded-sm" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reset Button Skeleton */}
                                <Skeleton className="h-9 w-full" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Products Grid Skeleton */}
                    <div className="flex-1">
                        {/* Title and Count Skeleton */}
                        <div className="mb-6">
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-5 w-32" />
                        </div>

                        {/* Products Grid Skeleton */}
                        <div className="grid grid-cols-2 place-items-center sm:place-items-stretch justify-center sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductCardSkeleton() {
    return (
        <div className="p-2 w-full">
            <Card className="overflow-hidden border-claro2 h-full">
                <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative">
                        <div className="aspect-square bg-claro2 animate-pulse" />
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                        <Skeleton className="h-3 w-16 mb-2" />
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-3 w-20 mb-4" />

                        <div className="mt-auto pt-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-8 rounded" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
