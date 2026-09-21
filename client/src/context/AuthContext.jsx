import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../api';

const AuthContext = createContext(null);
const TOKEN_KEY = 'farmers_side_token';
const USER_KEY = 'farmers_side_user';
const CART_KEY = 'farmers_side_cart';

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function readStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [cart, setCart] = useState(readStoredCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(TOKEN_KEY, token || '');
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await apiRequest('/users/profile', { token });
        setUser(profile);
      } catch {
        setUser(null);
        setToken('');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const saveSession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken || '');
  };

  const login = async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    });

    saveSession(data.user, data.token);
    return data;
  };

  const register = async (payload) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: payload,
    });

    saveSession(data.user, data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setCart([]);
  };

  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => (item._id || item.id) === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          _id: productId,
          id: productId,
          quantity: 1,
          originalPrice: Number(product.price ?? product.discountPrice ?? 0),
          price: Number(product.discountPrice ?? product.price ?? 0),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => (item._id || item.id) !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((currentCart) => currentCart.map((item) => (
      (item._id || item.id) === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      cart,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      cartCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    }),
    [user, token, cart, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
