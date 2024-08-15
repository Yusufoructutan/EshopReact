interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
  }


interface Props {
    children: React.ReactNode;
}

