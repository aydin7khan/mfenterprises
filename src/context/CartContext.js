import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';

// Create context
const CartContext = createContext();

// Initial state
const getInitialState = () => {
  const savedCartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

  // Calculate initial cart count from saved items
  const initialCartCount = savedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    cartItems: savedCartItems,
    cartCount: initialCartCount
  };
};

const initialState = getInitialState();

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + action.payload.quantity
        };

        return {
          ...state,
          cartItems: updatedCartItems,
          cartCount: state.cartCount + action.payload.quantity
        };
      } else {
        // Add new item
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          cartCount: state.cartCount + action.payload.quantity
        };
      }

    case REMOVE_FROM_CART:
      const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
        cartCount: state.cartCount - (itemToRemove ? itemToRemove.quantity : 0)
      };

    case UPDATE_QUANTITY:
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        const oldQuantity = updatedCartItems[itemIndex].quantity;
        updatedCartItems[itemIndex] = {
          ...updatedCartItems[itemIndex],
          quantity: quantity
        };

        return {
          ...state,
          cartItems: updatedCartItems,
          cartCount: state.cartCount + (quantity - oldQuantity)
        };
      }
      return state;

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        cartCount: 0
      };

    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    // Trigger cart icon animation immediately
    setIsCartAnimating(true);

    // Dispatch the action to update the cart
    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity }
    });

    // Reset animation after a short delay
    setTimeout(() => setIsCartAnimating(false), 600);

    // Generate a unique ID for this toast
    const toastId = Date.now();

    // Add new toast to the array
    setToasts(prevToasts => [
      ...prevToasts,
      {
        id: toastId,
        product: product.name,
        quantity: quantity,
        timestamp: Date.now()
      }
    ]);

    // Automatically remove toast after 3 seconds
    setTimeout(() => {
      closeToast(toastId);
    }, 3000);
  };

  // Close a specific toast by ID
  const closeToast = (toastId) => {
    setToasts(prevToasts =>
      prevToasts.filter(toast => toast.id !== toastId)
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id
    });
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartAnimating
      }}
    >
      {children}
      <div className="toast-container-wrapper">
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <Toast
              key={toast.id}
              product={toast.product}
              quantity={toast.quantity}
              onClose={() => closeToast(toast.id)}
              index={index}
              total={toasts.length}
            />
          ))}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
