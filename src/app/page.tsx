import { CardsSection } from "@/containers/home";
import { getProducts } from "@/services/products/requests";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardsSection />
      </HydrationBoundary>
    </div>
  );
}
