"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { LoginInput, RegisterInput } from "@/lib/validations/auth.schemas";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const { login: loginStore, register: registerStore } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      await loginStore(data);
      router.push("/");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      await registerStore(data);
      router.push("/");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, error, loading };
}
