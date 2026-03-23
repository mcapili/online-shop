// ProductsClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuLayoutGrid, LuList, LuAlignLeft } from "react-icons/lu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

export default function ProductsClient({
    layout,
    search,
    products,
}: {
    layout: string;
    search: string;
    products: any[];
}) {
    const [sort, setSort] = useState<string>("");

    // Apply sorting
    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "name") {
            return a.name.localeCompare(b.name);
        }
        if (sort === "price-asc") {
            return a.price - b.price; // lowest to highest
        }
        if (sort === "price-desc") {
            return b.price - a.price; // highest to lowest
        }
        return 0;
    });

    const totalProducts = sortedProducts.length;
    const searchTerm = search ? `&search=${search}` : "";

    return (
        <>
            {/* HEADER */}
            <section>
                <div className="flex justify-between items-center">
                    <h4 className="font-medium text-lg">
                        {totalProducts} product{totalProducts > 1 && "s"}
                    </h4>
                    <div className="flex gap-x-4">
                        {/* Layout buttons */}
                        <Button
                            variant={layout === "grid" ? "default" : "ghost"}
                            size="icon"
                            asChild
                        >
                            <Link href={`/products?layout=grid${searchTerm}`}>
                                <LuLayoutGrid />
                            </Link>
                        </Button>
                        <Button
                            variant={layout === "list" ? "default" : "ghost"}
                            size="icon"
                            asChild
                        >
                            <Link href={`/products?layout=list${searchTerm}`}>
                                <LuList />
                            </Link>
                        </Button>

                        {/* Dropdown for sorting */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <LuAlignLeft />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSort("name")}>
                                    Sort by name
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSort("price-asc")}>
                                    Price: Low to High
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSort("price-desc")}>
                                    Price: High to Low
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Separator className="mt-4" />
            </section>

            {/* PRODUCTS */}
            <div>
                {totalProducts === 0 ? (
                    <h5 className="text-2xl mt-16">
                        Sorry, no products matched your search...
                    </h5>
                ) : layout === "grid" ? (
                    <ProductsGrid products={sortedProducts} />
                ) : (
                    <ProductsList products={sortedProducts} />
                )}
            </div>
        </>
    );
}