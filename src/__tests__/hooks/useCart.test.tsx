import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../../hooks/useCart';
import { CartProvider } from '../../context/CartContext';
import type { CartItem } from '../../context/CartContext';

describe('useCart Hook', () => {
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

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('has addToCart method', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(typeof result.current.addToCart).toBe('function');
  });

  it('has removeFromCart method', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(typeof result.current.removeFromCart).toBe('function');
  });

  it('adds single item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(mockCartItem);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(mockCartItem);
  });

  it('adds multiple items sequentially', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item1: CartItem = { ...mockCartItem, id: '1' };
    const item2: CartItem = { ...mockCartItem, id: '2', name: 'Samsung' };
    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });
    expect(result.current.cart).toHaveLength(2);
  });

  it('stores item properties correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(mockCartItem);
    });
    const addedItem = result.current.cart[0];
    expect(addedItem.id).toBe('1');
    expect(addedItem.name).toBe('iPhone 15');
    expect(addedItem.price).toBe(999);
  });

  it('removes item by index', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item1: CartItem = { ...mockCartItem, id: '1' };
    const item2: CartItem = { ...mockCartItem, id: '2', name: 'Samsung' };
    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });
    act(() => {
      result.current.removeFromCart(0);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe('2');
  });

  it('removes correct item when multiple items exist', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const items: CartItem[] = [
      { ...mockCartItem, id: '1', name: 'Item 1' },
      { ...mockCartItem, id: '2', name: 'Item 2' },
      { ...mockCartItem, id: '3', name: 'Item 3' },
    ];
    act(() => {
      items.forEach(item => result.current.addToCart(item));
    });
    act(() => {
      result.current.removeFromCart(1);
    });
    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart[0].name).toBe('Item 1');
    expect(result.current.cart[1].name).toBe('Item 3');
  });

  it('returns current cart array', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(mockCartItem);
    });
    expect(Array.isArray(result.current.cart)).toBe(true);
    expect(result.current.cart.length > 0).toBe(true);
  });

  it('maintains cart state across operations', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(mockCartItem);
    });
    const firstLength = result.current.cart.length;
    act(() => {
      result.current.addToCart({ ...mockCartItem, id: '2' });
    });
    expect(result.current.cart.length).toBe(firstLength + 1);
  });
});
