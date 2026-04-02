import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneCard from '../../components/PhoneCard';
import type { Phone } from '../../types/phone';

const mockPhone: Phone = {
  id: '1',
  name: 'iPhone 15',
  brand: 'Apple',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone15.jpg',
};

const renderPhoneCard = (phone: Phone = mockPhone) => {
  return render(
    <BrowserRouter>
      <PhoneCard phone={phone} />
    </BrowserRouter>
  );
};

describe('PhoneCard Component', () => {
  it('renders phone card with correct phone details', () => {
    renderPhoneCard();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('displays the phone price', () => {
    renderPhoneCard();
    expect(screen.getByText(/999/)).toBeInTheDocument();
  });

  it('renders phone image with alt text', () => {
    renderPhoneCard();
    const img = screen.getByAltText('iPhone 15');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPhone.imageUrl);
  });

  it('renders as a link to phone detail page', () => {
    renderPhoneCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/1');
  });

  it('has correct CSS classes', () => {
    renderPhoneCard();
    const link = screen.getByRole('link');
    expect(link).toHaveClass('phone-card');
  });

  it('displays brand as uppercase', () => {
    renderPhoneCard();
    const brand = screen.getByText('Apple');
    expect(brand).toHaveClass('phone-card-brand');
  });

  it('renders phone model with correct styling', () => {
    renderPhoneCard();
    const model = screen.getByText('iPhone 15');
    expect(model).toHaveClass('phone-card-model');
  });

  it('renders price with correct styling', () => {
    renderPhoneCard();
    const priceElements = document.querySelectorAll('.phone-card-price');
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('works with different phones', () => {
    const differentPhone: Phone = {
      id: '2',
      name: 'Samsung S24',
      brand: 'Samsung',
      basePrice: 899,
      imageUrl: 'https://example.com/s24.jpg',
    };
    
    renderPhoneCard(differentPhone);
    expect(screen.getByText('Samsung S24')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText(/899/)).toBeInTheDocument();
  });
});
