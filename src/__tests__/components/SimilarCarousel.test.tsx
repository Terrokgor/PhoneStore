import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SimilarCarousel } from '../../components/SimilarCarousel';
import type { Phone } from '../../types/phone';

// Mock SimilarCard component
vi.mock('../../components/SimilarCard', () => ({
  SimilarCard: ({ phone }: { phone: Phone }) => (
    <div data-testid={`similar-card-${phone.id}`}>
      {phone.name}
    </div>
  ),
}));

const mockPhones: Phone[] = [
  {
    id: '1',
    name: 'iPhone 15',
    brand: 'Apple',
    basePrice: 999,
    imageUrl: '/images/iphone15.jpg',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    basePrice: 899,
    imageUrl: '/images/galaxy-s24.jpg',
  },
];

describe('SimilarCarousel Component', () => {
  const renderCarousel = (phones: Phone[] = mockPhones) => {
    return render(
      <BrowserRouter>
        <SimilarCarousel phones={phones} />
      </BrowserRouter>
    );
  };

  it('renders carousel container', () => {
    renderCarousel();
    const container = screen.getByTestId('similar-card-1').closest('.similar-carousel-container');
    expect(container).toBeInTheDocument();
  });

  it('renders all phone cards', () => {
    renderCarousel();
    expect(screen.getByTestId('similar-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('similar-card-2')).toBeInTheDocument();
  });

  it('renders single phone card centered', () => {
    renderCarousel([mockPhones[0]]);
    const container = screen.getByTestId('similar-card-1').closest('.similar-carousel');
    expect(container).toHaveClass('similar-carousel');
  });

  it('does not render when no phones provided', () => {
    const { container } = renderCarousel([]);
    expect(container.firstChild).toBeNull();
  });

  it('has fixed height wrapper', () => {
    renderCarousel();
    const wrapper = screen.getByTestId('similar-card-1').closest('.similar-carousel-wrapper');
    expect(wrapper).toHaveClass('similar-carousel-wrapper');
  });
});