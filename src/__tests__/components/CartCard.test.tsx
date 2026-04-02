import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartCard } from '../../components/CartCard';
import type { CartItem } from '../../context/CartContext';

const mockCartItem: CartItem = {
  id: '1',
  name: 'iPhone 15',
  price: 1099.99,
  color: 'Black',
  storage: '256GB',
  imageUrl: 'https://example.com/iphone15.jpg',
};

const renderCartCard = (item: CartItem = mockCartItem, onRemove = vi.fn()) => {
  return render(
    <CartCard item={item} index={0} onRemove={onRemove} />
  );
};

describe('CartCard Component', () => {
  it('renders cart item with all details', () => {
    renderCartCard();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('256GB | Black')).toBeInTheDocument();
  });

  it('displays the item price', () => {
    renderCartCard();
    expect(screen.getByText(/1099\.99/)).toBeInTheDocument();
  });

  it('renders product image with alt text', () => {
    renderCartCard();
    const img = screen.getByAltText('iPhone 15');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCartItem.imageUrl);
  });

  it('renders remove button', () => {
    renderCartCard();
    const removeBtn = screen.getByRole('button', { name: /eliminar/i });
    expect(removeBtn).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const mockOnRemove = vi.fn();
    renderCartCard(mockCartItem, mockOnRemove);
    
    const removeBtn = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(removeBtn);
    
    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('has correct CSS classes', () => {
    renderCartCard();
    const article = screen.getByRole('article');
    expect(article).toHaveClass('cart-card');
  });

  it('displays color and storage information', () => {
    renderCartCard();
    const specs = screen.getByText('256GB | Black');
    expect(specs).toBeInTheDocument();
  });

  it('works with different cart items', () => {
    const differentItem: CartItem = {
      id: '2',
      name: 'Samsung S24',
      price: 999.99,
      color: 'White',
      storage: '512GB',
      imageUrl: 'https://example.com/s24.jpg',
    };
    
    renderCartCard(differentItem);
    expect(screen.getByText('Samsung S24')).toBeInTheDocument();
    expect(screen.getByText('512GB | White')).toBeInTheDocument();
  });

  it('formats price with 2 decimal places', () => {
    renderCartCard();
    const priceText = screen.getByText(/1099\.99/);
    expect(priceText).toBeInTheDocument();
  });

  it('renders article element for semantic HTML', () => {
    renderCartCard();
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });
});
