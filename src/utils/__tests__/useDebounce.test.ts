import { act, renderHook } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

// Mock timers for testing
jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'updated', delay: 500 });
    
    // Value should still be the old one immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by less than delay
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    // Value should still be the old one
    expect(result.current).toBe('initial');

    // Fast-forward time to complete delay
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    // Now value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    // Change value multiple times rapidly
    rerender({ value: 'first', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    rerender({ value: 'second', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    rerender({ value: 'final', delay: 500 });
    
    // Value should still be initial
    expect(result.current).toBe('initial');
    
    // Complete the final delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Should show the final value
    expect(result.current).toBe('final');
  });

  it('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 100 }
      }
    );

    rerender({ value: 'updated', delay: 100 });
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(result.current).toBe('updated');
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 }
      }
    );

    rerender({ value: 'updated', delay: 0 });
    
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    expect(result.current).toBe('updated');
  });

  it('should work with different data types', () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 100 }
      }
    );

    numberRerender({ value: 42, delay: 100 });
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(numberResult.current).toBe(42);

    // Test with object
    const initialObj = { name: 'John' };
    const updatedObj = { name: 'Jane' };
    
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObj, delay: 100 }
      }
    );

    objectRerender({ value: updatedObj, delay: 100 });
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(objectResult.current).toBe(updatedObj);
  });
}); 