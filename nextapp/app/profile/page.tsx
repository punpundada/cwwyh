"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl">Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[400px]">
          <Image
            src={user.imgUrl}
            alt={user.firstName}
            fill
            className="object-cover p-10 rounded-full"
          />
        </div>
        <div className="space-y-7 content-center text-xl">
          <div>
            First Name : <strong className="italic">{user.firstName}</strong>
          </div>
          <div>
            Last Name : <strong className="italic">{user.lastName}</strong>
          </div>
          <div>
            Email : <strong className="italic">{user.email}</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
