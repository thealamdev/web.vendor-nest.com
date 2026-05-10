"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useState } from "react";
import { loginAction } from "./actions/auth/vendor/login-action";

export default function Home() {

  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev: any) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSubmit = async () => {

    const res = await loginAction(data);
    console.log(res)
    if(res.hasMemberships){
      router.push('/choose-workspace')
    }else{
      router.push('/dashboard')
    }
  }



  const [errors, action, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={action} className="bg-[#333] w-2xl p-5 space-y-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-50 text-center">Login</h3>
        <div className="space-y-2">
          <label className="block" htmlFor="email">Email</label>
          <Input
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="block" htmlFor="password">Password</label>
          <Input
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <Button variant='outline' className="w-full">{isPending ? 'Login...' : 'Login'}</Button>
      </form>
    </div>
  );
}
