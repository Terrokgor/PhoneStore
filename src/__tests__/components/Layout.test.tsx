import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import { CartProvider } from '../../context/CartContext';

const renderLayout = () => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Test Content</div>} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Layout Component', () => {
  it('renders the navbar', () => {
    renderLayout();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the main content area', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders outlet children content', () => {
    renderLayout();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has correct structure with navbar and main', () => {
    renderLayout();
    const nav = screen.getByRole('navigation');
    const main = screen.getByRole('main');
    
    expect(nav).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it('main element has padding style', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toHaveStyle({ padding: '1rem' });
  });
});
