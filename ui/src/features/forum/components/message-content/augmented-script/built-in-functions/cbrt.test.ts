import Decimal from 'decimal.js';
import { cbrtFunction } from './cbrt';

describe('cbrt function', () => {
  it('should calculate cbrt(27) correctly', () => {
    const result = cbrtFunction.handler(new Decimal(27)) as Decimal;
    expect(result.toString()).toBe('3');
  });

  it('should calculate cbrt(8) correctly', () => {
    const result = cbrtFunction.handler(new Decimal(8)) as Decimal;
    expect(result.toString()).toBe('2');
  });

  it('should calculate cbrt(-8) correctly', () => {
    const result = cbrtFunction.handler(new Decimal(-8)) as Decimal;
    expect(result.toString()).toBe('-2');
  });

  it('should calculate cbrt(0) correctly', () => {
    const result = cbrtFunction.handler(new Decimal(0)) as Decimal;
    expect(result.toString()).toBe('0');
  });

  it('should handle small and large numbers', () => {
    const small = cbrtFunction.handler(new Decimal(1e-9)) as Decimal;
    expect(small.toDP(10).toString()).toBe('0.001');
    const large = cbrtFunction.handler(new Decimal(1e9)) as Decimal;
    expect(large.toString()).toBe('1000');
  });

  it('should have correct metadata', () => {
    expect(cbrtFunction.name).toBe('cbrt');
    expect(cbrtFunction.description).toBe('Calculates the cube root of x (cbrt x). Handles negative and positive values.');
    expect(cbrtFunction.returnType).toBe('Decimal');
    expect(cbrtFunction.parameters).toHaveLength(1);
    expect(cbrtFunction.parameters[0].name).toBe('x');
    expect(cbrtFunction.parameters[0].required).toBe(true);
  });
}); 