"use client"

import Button from "@/ui/button";

import { useLogoutQuery } from "@/services/auth/queries";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserDataQuery } from "@/services/user/queries";
import { useQueryClient } from "@tanstack/react-query";


const AppHeader = (): JSX.Element => {
  const router = useRouter();

  const {
    mutate: logoutMutation,
    reset: logoutError,
  } = useLogoutQuery();

  const queryClient = useQueryClient()

  const logOutHandler = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        deleteCookie("token");
        queryClient.removeQueries({ queryKey: ["user"] });
        router.push("/sign-in");
      }
    })
  }

  const { isFetched: isUserData } = useUserDataQuery();

  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-slate-300/30 backdrop-blur-sm rounded-3xl overflow-hidden z-[1000]">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <h4 className="text-lg font-bold">
            Authorization
          </h4>
        </Link>
        <div className="flex items-center gap-4">
          {isUserData ?
            <>
              <Link href={"/account"}>
                <Button className="px-4">
                  <p className="text-base font-medium">Account</p>
                </Button>
              </Link>
              <Button
                className="px-4"
                onClick={() => logOutHandler()}
              >
                <p className="text-base font-medium">Log out</p>
              </Button>
            </>
            :
            <>
              <Link href={"/sign-in"}>
                <Button className="px-4">
                  <p className="text-base font-medium">Log in</p>
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="px-4">
                  <p className="text-base font-medium">Sign up</p>
                </Button>
              </Link>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default AppHeader;