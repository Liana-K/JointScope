import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedOrders = localStorage.getItem('orderHistory');
    const storedWishlist = localStorage.getItem('wishlist');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedOrders) {
      setOrderHistory(JSON.parse(storedOrders));
    }
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const login = (email, password) => {
    const userData = {
      id: Date.now(),
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      joinedDate: new Date().toISOString(),
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Pending',
    };
    const updatedOrders = [...orderHistory, newOrder];
    setOrderHistory(updatedOrders);
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
    return newOrder;
  };

  const updateWishlistStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  useEffect(() => {
    updateWishlistStorage();
  }, [wishlist]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        orderHistory,
        addOrder,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
