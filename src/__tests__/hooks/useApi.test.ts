import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useApi } from '../../hooks/useApi';

// Mock fetch globally
const mockFetch = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.fetch = mockFetch as any;

describe('useApi Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it('returns callApi function', () => {
    const { result } = renderHook(() => useApi());
    expect(result.current.callApi).toBeDefined();
    expect(typeof result.current.callApi).toBe('function');
  });

  it('makes GET request with correct headers', async () => {
    const mockResponse = { products: [] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useApi());
    
    await result.current.callApi({
      endpoint: '/products',
      method: 'GET',
    });

    expect(mockFetch).toHaveBeenCalled();
    const call = mockFetch.mock.calls[0];
    expect(call[0]).toContain('/products');
    expect(call[1].headers['x-api-key']).toBeDefined();
  });

  it('appends GET parameters to URL', async () => {
    const mockResponse = { products: [] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useApi());
    
    await result.current.callApi({
      endpoint: '/products',
      method: 'GET',
      params: { search: 'iPhone', limit: 10 },
    });

    const call = mockFetch.mock.calls[0];
    expect(call[0]).toContain('search=iPhone');
    expect(call[0]).toContain('limit=10');
  });

  it('makes POST request with body', async () => {
    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useApi());
    
    const body = { name: 'Test' };
    await result.current.callApi({
      endpoint: '/products',
      method: 'POST',
      body,
    });

    const call = mockFetch.mock.calls[0];
    expect(call[1].method).toBe('POST');
    expect(call[1].body).toEqual(JSON.stringify(body));
  });

  it('throws error on failed request', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'Not found',
    });

    const { result } = renderHook(() => useApi());
    
    await expect(
      result.current.callApi({
        endpoint: '/products/999',
        method: 'GET',
      })
    ).rejects.toThrow();
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApi());
    
    await expect(
      result.current.callApi({
        endpoint: '/products',
        method: 'GET',
      })
    ).rejects.toThrow();
  });

  it('returns parsed JSON response', async () => {
    const mockResponse = { id: '1', name: 'iPhone 15' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useApi());
    
    const response = await result.current.callApi({
      endpoint: '/products/1',
      method: 'GET',
    });

    expect(response).toEqual(mockResponse);
  });

  it('includes Content-Type header', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useApi());
    
    await result.current.callApi({
      endpoint: '/products',
      method: 'GET',
    });

    const call = mockFetch.mock.calls[0];
    expect(call[1].headers['Content-Type']).toBe('application/json');
  });

  it('defaults to GET method', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useApi());
    
    await result.current.callApi({
      endpoint: '/products',
    });

    const call = mockFetch.mock.calls[0];
    expect(call[1].method).toBe('GET');
  });

  it('handles undefined parameters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useApi());
    
    await result.current.callApi({
      endpoint: '/products',
      method: 'GET',
      params: { search: 'test', limit: undefined },
    });

    const call = mockFetch.mock.calls[0];
    expect(call[0]).toContain('search=test');
    expect(call[0]).not.toContain('limit');
  });
});
