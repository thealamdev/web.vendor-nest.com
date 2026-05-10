"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev:any) => (
        {
          ...prev,
          [e.target.name]: e.target.value
        }
      ))
  }

  const handleSubmit = async (e:FormEvent) => {
      e.preventDefault();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/auth/login`, data);
      if(!res.data.payload.memberships){
        router.push('/choose-workspace')
      }else{
        router.push('/dashboard')
      }

  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-[#333] w-2xl p-5 space-y-4 rounded-xl">
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

        <Button variant='outline' className="w-full">Login</Button>
      </form>
    </div>
  );
}
