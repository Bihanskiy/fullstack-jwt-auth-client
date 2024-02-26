"use client"

import { useProductsDataQuery } from "@/services/products/queries";
import React from "react";
import ProductCard from "@/components/product-card.component";

const CardsSection = (): JSX.Element => {
  const { data: productsData } = useProductsDataQuery();

  return (
    <section
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {productsData?.data?.map(product => {
        return (
          <ProductCard
            key={product._id}
            photoSrc={product.photo}
            brandName={product.brand}
            name={product.name}
            currentPrice={product.currentPrice}
            oldPrice={product.oldPrice}
          />
        )
      })}
    </section>
  )
}

export default CardsSection;