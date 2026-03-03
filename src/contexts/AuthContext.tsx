import { createContext, useContext, useState, ReactNode } from "react";
import { User, mockUsers } from "@/data/campusData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: "student" | "professor", department: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    const found = mockUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // Demo: accept any email, default to student
    setUser({
      id: "demo-" + Date.now(),
      name: email.split("@")[0],
      email,
      role: "student",
      department: "General",
      bio: "Demo user",
      skills: [],
    });
    return true;
  };

  const signup = (name: string, email: string, _password: string, role: "student" | "professor", department: string): boolean => {
    setUser({
      id: "new-" + Date.now(),
      name,
      email,
      role,
      department,
      bio: "",
      skills: [],
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
