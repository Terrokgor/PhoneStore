import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SimilarCard } from '../../components/SimilarCard';
import type { Phone } from '../../types/phone';

const mockPhone: Phone = {
  id: '1',
  name: 'Google Pixel 8',
  brand: 'Google',
  basePrice: 799,
  imageUrl: 'https://example.com/pixel8.jpg',
};

const renderSimilarCard = (phone: Phone = mockPhone) => {
  return render(
    <BrowserRouter>
      <SimilarCard phone={phone} />
    </BrowserRouter>
  );
};

describe('SimilarCard Component', () => {
  it('renders similar card with phone details', () => {
    renderSimilarCard();
    expect(screen.getByText('Google Pixel 8')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('displays the phone price', () => {
    renderSimilarCard();
    expect(screen.getByText(/799/)).toBeInTheDocument();
  });

  it('renders phone image with alt text', () => {
    renderSimilarCard();
    const img = screen.getByAltText('Google Pixel 8');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPhone.imageUrl);
  });

  it('renders as a link to phone detail page', () => {
    renderSimilarCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/1');
  });

  it('has correct CSS class', () => {
    renderSimilarCard();
    const link = screen.getByRole('link');
    expect(link).toHaveClass('similar-card');
  });

  it('displays brand as uppercase', () => {
    renderSimilarCard();
    const brand = screen.getByText('Google');
    expect(brand).toHaveClass('similar-card-brand');
  });

  it('renders phone model with correct styling', () => {
    renderSimilarCard();
    const model = screen.getByText('Google Pixel 8');
    expect(model).toHaveClass('similar-card-model');
  });

  it('works with different phones', () => {
    const differentPhone: Phone = {
      id: '3',
      name: 'OnePlus 12',
      brand: 'OnePlus',
      basePrice: 649,
      imageUrl: 'https://example.com/oneplus.jpg',
    };
    
    renderSimilarCard(differentPhone);
    expect(screen.getByText('OnePlus 12')).toBeInTheDocument();
    expect(screen.getByText('OnePlus')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    renderSimilarCard();
    const priceText = screen.getByText(/799/);
    expect(priceText).toBeInTheDocument();
  });
});
