import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "@/services/auth";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  initializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AUTH_STORAGE_KEY = "auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // 🔄 Restore session on app start
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // corrupted storage — clean it
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (err) {
        console.warn("Failed to restore auth user", err);
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };

    restoreUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await authService.login({ email, password });

      if (!res?.user) {
        throw new Error("Invalid login response");
      }

      setUser(res.user);
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(res.user)
      );
    } catch (err) {
      throw err; // 👈 important: bubble up to UI
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn("Logout cleanup failed", err);
      setUser(null); // always enforce logout
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
