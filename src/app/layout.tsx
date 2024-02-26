import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";

import AppFooter from "@/components/app-footer.component";
import AppHeader from "@/components/app-header.component";
import { Providers } from "./providers";

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getUserData } from "@/services/user/requests";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Auth",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()
  const token = getCookie('token', { cookies })

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: token ? () => getUserData({ Authorization: `Bearer ${token}` }) : undefined
  })

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-col min-h-screen">
              <AppHeader />
              <main className="flex-grow px-5 pt-24 container mx-auto w-full">
                {children}
              </main>
              <AppFooter />
            </div>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
