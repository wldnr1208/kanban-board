"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterView() {
  const router = useRouter();
  const [isLoginTab, setIsLoginTab] = useState(false);

  const handleTabChange = (isLogin: boolean) => {
    if (isLogin) {
      router.push("/login");
    } else {
      setIsLoginTab(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6fa]">
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-sm p-8">
        {/* Logo */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-[28px] font-bold text-primary">KANBAN</h1>
          <p className="text-[14px] text-gray-500 mt-1">
            프로젝트 관리를 더 쉽고 효율적으로
          </p>
        </div>

        {/* Tabs */}
        <div className="flex">
          <button
            className={`flex-1 h-[50px] text-[16px] font-medium ${
              isLoginTab ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => handleTabChange(true)}
          >
            로그인
          </button>
          <button
            className={`flex-1 h-[50px] text-[16px] font-medium ${
              !isLoginTab
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => handleTabChange(false)}
          >
            회원가입
          </button>
        </div>

        {/* Register Form */}
        <div className="p-8">
          <form className="space-y-4">
            <div>
              <Input type="text" placeholder="이름" className="w-full p-3" />
            </div>
            <div>
              <Input type="email" placeholder="이메일" className="w-full p-3" />
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호 (8자 이상)"
                className="w-full p-3"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full p-3 mb-5"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-[46px] bg-primary hover:bg-primary/90 text-[16px]"
            >
              회원가입
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-[14px] text-gray-500 bg-white">
                  또는
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-[46px] bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-0 text-[16px]"
            >
              카카오로 계속하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
