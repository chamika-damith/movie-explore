
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for a saved user in localStorage
    const savedUser = localStorage.getItem("movieExplorerUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    // For demo purposes, we're using a simple auth check
    // In a real app, you would validate against an API
    if (username && password.length >= 4) {
      const newUser = { username, isAuthenticated: true };
      setUser(newUser);
      localStorage.setItem("movieExplorerUser", JSON.stringify(newUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Username and password are required. Password must be at least 4 characters.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieExplorerUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
