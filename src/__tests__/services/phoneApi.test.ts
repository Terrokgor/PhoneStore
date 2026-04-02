import { describe, it, expect } from 'vitest';
import { getPhones, getPhoneById } from '../../services/phoneApi';

describe('Phone API Services', () => {
  it('creates getPhones config with default values', () => {
    const config = getPhones();
    
    expect(config).toBeDefined();
    expect(config.method).toBe('GET');
    expect(config.endpoint).toBe('/products');
    expect(config.params).toBeUndefined();
  });

  it('creates getPhones config with search parameter', () => {
    const config = getPhones({ search: 'iPhone' });
    
    expect(config.params?.search).toBe('iPhone');
  });

  it('creates getPhones config with limit parameter', () => {
    const config = getPhones({ limit: 20 });
    
    expect(config.params?.limit).toBe(20);
  });

  it('creates getPhones config with multiple parameters', () => {
    const config = getPhones({ search: 'Samsung', limit: 10 });
    
    expect(config.params?.search).toBe('Samsung');
    expect(config.params?.limit).toBe(10);
  });

  it('getPhoneById creates correct config', () => {
    const config = getPhoneById('123');
    
    expect(config).toBeDefined();
    expect(config.method).toBe('GET');
    expect(config.endpoint).toBe('/products/123');
  });

  it('getPhoneById works with different IDs', () => {
    const config1 = getPhoneById('abc');
    const config2 = getPhoneById('xyz');
    
    expect(config1.endpoint).toBe('/products/abc');
    expect(config2.endpoint).toBe('/products/xyz');
  });

  it('getPhones config has GET method', () => {
    const config = getPhones();
    expect(config.method).toBe('GET');
  });

  it('getPhoneById config has GET method', () => {
    const config = getPhoneById('1');
    expect(config.method).toBe('GET');
  });

  it('getPhones returns object with correct structure', () => {
    const config = getPhones();
    
    expect(typeof config).toBe('object');
    expect('method' in config).toBe(true);
    expect('endpoint' in config).toBe(true);
  });

  it('getPhoneById returns object with correct structure', () => {
    const config = getPhoneById('1');
    
    expect(typeof config).toBe('object');
    expect('method' in config).toBe(true);
    expect('endpoint' in config).toBe(true);
  });
});
