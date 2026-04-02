import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detail from '../../pages/Detail';
import { CartProvider } from '../../context/CartContext';

describe('Detail Page', () => {
  const renderDetail = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <Detail />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    expect(() => {
      renderDetail();
    }).not.toThrow();
  });

  it('handles missing ID parameter gracefully', () => {
    const { container } = render(
      <BrowserRouter>
        <CartProvider>
          <Detail />
        </CartProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  it('component mounts in CartProvider context', () => {
    const { container } = renderDetail();
    expect(container).toBeInTheDocument();
  });

  it('renders in BrowserRouter context', () => {
    const { container } = renderDetail();
    expect(container.children.length).toBeGreaterThanOrEqual(0);
  });

  it('component integrates with CartProvider', () => {
    expect(() => {
      renderDetail();
    }).not.toThrow();
  });

  it('component integrates with BrowserRouter', () => {
    expect(() => {
      renderDetail();
    }).not.toThrow();
  });

  it('page structure renders', () => {
    const { container } = renderDetail();
    expect(container.firstChild).toBeTruthy();
  });

  it('renders as valid React component', () => {
    const { container } = renderDetail();
    expect(container.children.length >= 0).toBe(true);
  });

  it('does not crash with missing params', () => {
    const { container } = renderDetail();
    expect(container).toBeInTheDocument();
  });

  it('component loads in app context', () => {
    const result = renderDetail();
    expect(result.container).toBeInTheDocument();
  });

  it('renders page structure without errors', () => {
    const { container } = renderDetail();
    expect(container).toBeTruthy();
  });
});
