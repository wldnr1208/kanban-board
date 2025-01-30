"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/axios-instance";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<string>("");

  const handleLogin = async (data: LoginForm) => {
    try {
      // 로컬 테스트를 위한 하드코딩된 데이터
      const mockUsers = [
        {
          email: "test@test.com",
          password: "12345678",
          name: "테스트 유저",
        },
      ];

      const user = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (user) {
        // 실제로는 서버에서 받아야 하는 토큰값을 임시로 생성
        const mockToken = btoa(JSON.stringify({ id: 1, email: user.email }));
        localStorage.setItem("token", mockToken);
        localStorage.setItem("user", JSON.stringify(user));

        // 대시보드로 이동
        router.push("/dashboard");
      } else {
        setErrors("이메일 또는 비밀번호가 올바르지 않습니다.");
      }

      // 실제 API 연동시 사용할 코드
      /*
      const response = await api.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/dashboard');
      */
    } catch (error) {
      setErrors("로그인 중 오류가 발생했습니다.");
    }
  };

  return {
    errors,
    handleLogin,
  };
};
