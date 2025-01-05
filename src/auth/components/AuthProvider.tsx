import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from storage
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Transform firebase user to your AuthUser type
        const authUser = {
          id: user.uid,
          email: user.email,
          // ... other user properties
        };
        login(authUser);
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, [login, logout]);

  return <>{children}</>;
}