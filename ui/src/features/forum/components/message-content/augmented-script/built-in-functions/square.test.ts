import Decimal from 'decimal.js';
import { squareFunction } from './square';

describe('square function', () => {
  it('should calculate square(5) correctly', () => {
    const result = squareFunction.handler(new Decimal(5)) as Decimal;
    expect(result.toString()).toBe('25');
  });

  it('should calculate square(2.5) correctly', () => {
    const result = squareFunction.handler(new Decimal(2.5)) as Decimal;
    expect(result.toString()).toBe('6.25');
  });

  it('should calculate square(-3) correctly', () => {
    const result = squareFunction.handler(new Decimal(-3)) as Decimal;
    expect(result.toString()).toBe('9');
  });

  it('should calculate square(0) correctly', () => {
    const result = squareFunction.handler(new Decimal(0)) as Decimal;
    expect(result.toString()).toBe('0');
  });

  it('should handle large numbers', () => {
    const result = squareFunction.handler(new Decimal(1e5)) as Decimal;
    expect(result.toString()).toBe('10000000000');
  });

  it('should have correct metadata', () => {
    expect(squareFunction.name).toBe('square');
    expect(squareFunction.description).toBe('Calculates x squared (x^2) for any real number.');
    expect(squareFunction.returnType).toBe('Decimal');
    expect(squareFunction.parameters).toHaveLength(1);
    expect(squareFunction.parameters[0].name).toBe('x');
    expect(squareFunction.parameters[0].required).toBe(true);
  });
}); 