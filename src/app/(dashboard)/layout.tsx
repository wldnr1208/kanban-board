"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바는 추후 구현 */}
      <main>{children}</main>
    </div>
  );
}
