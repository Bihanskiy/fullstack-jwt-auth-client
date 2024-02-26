"use client"
import React from "react";

import { useUserDataQuery } from "@/services/user/queries";

const UserDataSection = (): JSX.Element => {
  const { data: userData } = useUserDataQuery();

  return (
    <section className="pt-4">
      <div className="max-w-96 w-full bg-white rounded-2xl p-4 mx-auto">
        <h4 className="font-bold text-2xl mb-4">Your account data</h4>
        <div className="flex items-center gap-3">
          <p>Email:</p>
          <p>{userData?.data?.email}</p>
        </div>
      </div>
    </section>
  )
}

export default UserDataSection;