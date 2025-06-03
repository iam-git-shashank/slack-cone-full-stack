import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    console.log(email);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const user = await res.json();
        console.log(user.auth_user);
        // localStorage.setItem('token', accessToken);
        localStorage.setItem("user", user.auth_user.userId);

        return { success: true, redirectTo: "/home" };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid credentials",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "NetworkError",
          message: "Login request failed",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = localStorage.getItem("user");
    if (token) {
      return { authenticated: true };
    } else {
      return {
        authenticated: false,
        redirectTo: "/login",
        error: { name: "AuthError", message: "User not authenticated" },
      };
    }
  },

  getIdentity: async () => {
    return {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    };
  },

  getPermissions: async () => null,

  // 🔧 Required method
  onError: async (error) => {
    console.error("Auth error:", error);
    return { logout: false };
  },
};
