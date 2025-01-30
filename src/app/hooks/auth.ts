import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

interface LoginCredentials {
  email: string;
  password: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data); // 전체 인증 데이터 저장
      setUser(data.user); // 사용자 정보만 저장
      router.push("/boards");
    },
  });
};
