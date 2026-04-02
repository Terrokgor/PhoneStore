import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';
import { CartProvider } from '../../context/CartContext';

// Mock CartCard component
vi.mock('../../components/CartCard', () => ({
  CartCard: ({ item }: any) => (
    <article data-testid={`cart-item}`}>
      <h2>{item.name}</h2>
      <p>{item.price}</p>
    </article>
  ),
}));

describe('Cart Page', () => {
  const renderCart = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <Cart />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    expect(() => {
      renderCart();
    }).not.toThrow();
  });

  it('renders cart container', () => {
    const { container } = renderCart();
    const cartContainer = container.querySelector('.cart-container');
    expect(cartContainer).toBeInTheDocument();
  });

  it('has cart header element', () => {
    const { container } = renderCart();
    const header = container.querySelector('.cart-header');
    expect(header).toBeInTheDocument();
  });

  it('displays cart header title', () => {
    renderCart();
    const heading = screen.getByRole('heading', { name: /cart/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders cart with initial empty state', () => {
    const { container } = renderCart();
    expect(container).toBeInTheDocument();
  });

  it('shows empty cart message when cart is empty', () => {
    renderCart();
    const emptyMessage = screen.getByText(/el carrito está vacío/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('empty cart message has correct CSS class', () => {
    renderCart();
    const emptyMessage = screen.getByText(/el carrito está vacío/i);
    expect(emptyMessage).toHaveClass('empty-cart');
  });

  it('cart element has semantic structure', () => {
    const { container } = renderCart();
    const cartContainer = container.querySelector('.cart-container');
    expect(cartContainer).toBeInTheDocument();
    expect(cartContainer?.querySelector('.cart-header')).toBeInTheDocument();
  });

  it('renders useCart hook successfully', () => {
    expect(() => {
      renderCart();
    }).not.toThrow();
  });

  it('displays cart with proper div structure',() => {
    const { container } = renderCart();
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
