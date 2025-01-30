"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation"; // useRouter import 추가
import { useLogin } from "@/app/hooks/useLogin";

export function LoginForm() {
  const router = useRouter();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleTabChange = (isLogin: boolean) => {
    if (isLogin) {
      setIsLoginTab(true);
    } else {
      router.push("/register");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 테스트용 로그인 검증
    if (
      formData.email === "test@gmail.com" &&
      formData.password === "12345678"
    ) {
      // JWT 토큰 모사
      const mockToken = btoa(
        JSON.stringify({
          id: 1,
          email: formData.email,
          exp: new Date().getTime() + 60 * 60 * 1000, // 1시간 유효
        })
      );

      // 토큰 저장
      localStorage.setItem("token", mockToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          name: "테스트 유저",
        })
      );

      // 대시보드로 이동
      router.push("/dashboard");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6fa]">
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-sm p-8">
        {/* 로고 영역 */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-[28px] font-bold text-primary">KANBAN</h1>
          <p className="text-[14px] text-gray-500 mt-1">
            프로젝트 관리를 더 쉽고 효율적으로
          </p>
        </div>

        {/* 탭 영역 */}
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

        {/* 폼 영역 */}
        <div className="p-8">
          {isLoginTab ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="text-[14px] text-gray-600 mb-1 block">
                    이메일
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full h-[46px] text-[14px]"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-[14px] text-gray-600 mb-1 block">
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••"
                    className="w-full h-[46px] text-[14px]"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="w-4 h-4 rounded" />
                  <label
                    htmlFor="remember"
                    className="text-[14px] text-gray-600 select-none"
                  >
                    로그인 상태 유지
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-[14px] text-primary hover:underline"
                >
                  비밀번호 찾기
                </Link>
              </div>

              {error && (
                <div className="text-red-500 text-[14px] text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-[46px] bg-primary hover:bg-primary/90 text-[16px]"
              >
                로그인
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
          ) : (
            <div className="text-center py-8">
              <h2 className="text-[16px]">회원가입 폼은 추후 구현 예정</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
