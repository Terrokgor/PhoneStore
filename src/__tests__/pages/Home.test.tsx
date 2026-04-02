import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { CartProvider } from '../../context/CartContext';

// Mock the hooks
vi.mock('../../hooks/useApi', () => ({
  useApi: () => ({
    callApi: vi.fn(async () => []),
  }),
}));

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

// Mock PhoneCard component
vi.mock('../../components/PhoneCard', () => ({
  default: ({ phone }: any) => <div data-testid="phone-card">{phone.name}</div>,
}));

describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <Home />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    expect(() => {
      renderHome();
    }).not.toThrow();
  });

  it('renders search input', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('has correct CSS class for search input', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toHaveClass('search-input');
  });

  it('renders phone grid container', () => {
    const { container } = renderHome();
    const grid = container.querySelector('.phone-grid');
    expect(grid).toBeInTheDocument();
  });

  it('search input starts empty', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/buscar/i) as HTMLInputElement;
    expect(searchInput.value).toBe('');
  });

  it('renders results container', () => {
    renderHome();
    const results = screen.getByText(/resultados encontrados/i);
    expect(results).toBeInTheDocument();
  });

  it('has div wrapper for entire page', () => {
    const { container } = renderHome();
    const wrapper = container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
  });

  it('search input is visible', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toBeVisible();
  });

  it('displays loading text', () => {
    renderHome();
    const loadingText = screen.getByText(/Cargando/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('has proper input attributes', () => {
    renderHome();
    const input = screen.getByPlaceholderText(/buscar/i) as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('renders page content div', () => {
    const { container } = renderHome();
    const allDivs = container.querySelectorAll('div');
    expect(allDivs.length).toBeGreaterThan(0);
  });

  it('phone grid is in document', () => {
    const { container } = renderHome();
    const grid = container.querySelector('.phone-grid');
    expect(grid?.parentElement).toBeInTheDocument();
  });

  it('input is within form-like structure', () => {
    const { container } = renderHome();
    const input = screen.getByPlaceholderText(/buscar/i);
    expect(input).toBeInTheDocument();
    expect(container.contains(input)).toBe(true);
  });
});

