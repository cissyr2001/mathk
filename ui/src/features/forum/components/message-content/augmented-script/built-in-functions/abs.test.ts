import Decimal from 'decimal.js';
import { absFunction } from './abs';

describe('abs function', () => {
  it('should return positive value for negative input', () => {
    expect(absFunction.handler(new Decimal(-5)).toString()).toBe('5');
    expect(absFunction.handler(new Decimal(-3.14)).toString()).toBe('3.14');
    expect(absFunction.handler(new Decimal(-0)).toString()).toBe('0');
  });

  it('should return same value for positive input', () => {
    expect(absFunction.handler(new Decimal(5)).toString()).toBe('5');
    expect(absFunction.handler(new Decimal(3.14)).toString()).toBe('3.14');
    expect(absFunction.handler(new Decimal(0)).toString()).toBe('0');
  });

  it('should handle large numbers', () => {
    expect(absFunction.handler(new Decimal('-1e10')).toString()).toBe('10000000000');
    expect(absFunction.handler(new Decimal('1e10')).toString()).toBe('10000000000');
  });

  it('should have correct metadata', () => {
    expect(absFunction.name).toBe('abs');
    expect(absFunction.description).toBe('Returns the absolute value of x.');
    expect(absFunction.returnType).toBe('Decimal');
    expect(absFunction.parameters).toHaveLength(1);
    expect(absFunction.parameters[0].name).toBe('x');
    expect(absFunction.parameters[0].required).toBe(true);
  });
}); 