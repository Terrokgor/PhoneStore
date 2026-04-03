import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CartProvider } from '../../context/CartContext';

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  it('renders navbar with logo link', () => {
    renderNavbar();
    const logoLink = screen.getByRole('link', { name: /phonestore logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navbar with cart link', () => {
    renderNavbar();
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('displays cart count', () => {
    renderNavbar();
    const cartText = screen.getByText('0');
    expect(cartText).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');
  });

  it('renders logo image with correct attributes', () => {
    renderNavbar();
    const logoImg = screen.getByAltText('PhoneStore logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveClass('logo-image');
  });

  it('renders cart icon image with correct attributes', () => {
    renderNavbar();
    const cartIcon = screen.getByAltText('Cart');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveClass('cart-icon');
  });
});
