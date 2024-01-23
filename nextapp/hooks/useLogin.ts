'use client'
import { useToast } from "@/components/ui/use-toast";
import { loginService } from "@/services/loginService";
import { authStore } from "@/store/auth-store";
import { ILoginReq } from "@/types/loginReq";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useLogin = () => {
  const setLoggedIn = authStore((s) => s.setIsLoggedIn);
  const { toast } = useToast();
  const router =useRouter();
  const [data, setData] = useState<ILoginReq | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!data) return;
      const res = await loginService(data);
      if (res?.isSuccess) {
        setLoggedIn(true);
        toast({
          title: "Success",
          description: res.data.message,
          className: "",
        });
        router.push("/");
      }
    };
    fetchData();
  }, [data, router, setLoggedIn, toast]);

  return async (data: ILoginReq) => {
    setData(data);
  };
};

export default useLogin;
