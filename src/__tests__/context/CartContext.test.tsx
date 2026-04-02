import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../../hooks/useCart';
import { CartProvider } from '../../context/CartContext';
import type { CartItem } from '../../context/CartContext';

describe('CartContext via useCart Hook', () => {
  const mockCartItem: CartItem = {
    id: '1',
    name: 'iPhone 15',
    price: 999,
    color: 'Black',
    storage: '128GB',
    imageUrl: 'https://example.com/iphone.jpg',
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Cart State', () => {
    it('initializes cart as empty array', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.cart).toEqual([]);
      expect(Array.isArray(result.current.cart)).toBe(true);
    });

    it('provides addToCart function', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(typeof result.current.addToCart).toBe('function');
    });

    it('provides removeFromCart function', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(typeof result.current.removeFromCart).toBe('function');
    });
  });

  describe('addToCart', () => {
    it('adds item to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockCartItem);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0]).toEqual(mockCartItem);
    });

    it('adds multiple items to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1 = { ...mockCartItem, id: '1' };
      const item2 = { ...mockCartItem, id: '2', name: 'Samsung Galaxy' };

      act(() => {
        result.current.addToCart(item1);
        result.current.addToCart(item2);
      });

      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart[0].id).toBe('1');
      expect(result.current.cart[1].id).toBe('2');
    });

    it('preserves cart items in order', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1 = { ...mockCartItem, id: '1' };
      const item2 = { ...mockCartItem, id: '2' };
      const item3 = { ...mockCartItem, id: '3' };

      act(() => {
        result.current.addToCart(item1);
        result.current.addToCart(item2);
        result.current.addToCart(item3);
      });

      expect(result.current.cart[0].id).toBe('1');
      expect(result.current.cart[1].id).toBe('2');
      expect(result.current.cart[2].id).toBe('3');
    });
  });

  describe('removeFromCart', () => {
    it('removes item at specified index', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1 = { ...mockCartItem, id: '1' };
      const item2 = { ...mockCartItem, id: '2' };

      act(() => {
        result.current.addToCart(item1);
        result.current.addToCart(item2);
      });

      expect(result.current.cart).toHaveLength(2);

      act(() => {
        result.current.removeFromCart(0);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe('2');
    });

    it('handles removing last item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockCartItem);
      });

      expect(result.current.cart).toHaveLength(1);

      act(() => {
        result.current.removeFromCart(0);
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it('removes correct item by index', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1 = { ...mockCartItem, id: '1', name: 'Item 1' };
      const item2 = { ...mockCartItem, id: '2', name: 'Item 2' };
      const item3 = { ...mockCartItem, id: '3', name: 'Item 3' };

      act(() => {
        result.current.addToCart(item1);
        result.current.addToCart(item2);
        result.current.addToCart(item3);
      });

      act(() => {
        result.current.removeFromCart(1);
      });

      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart[0].name).toBe('Item 1');
      expect(result.current.cart[1].name).toBe('Item 3');
    });
  });
});
