// hooks/useAuth.ts
'use client'

import { useAuth } from "@/app/context/AuthContext";


export const useAuthStatus = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn;
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};
