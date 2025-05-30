import Decimal from 'decimal.js';
import { sinFunction } from '../sin';

describe('sin function', () => {
  it('should calculate sin(0) correctly', () => {
    const result = sinFunction.handler(new Decimal(0));
    expect(result.toString()).toBe('0');
  });

  it('should calculate sin(π/2) correctly', () => {
    const result = sinFunction.handler(new Decimal(Math.PI / 2));
    expect(result.toString()).toBe('1');
  });

  it('should calculate sin(π) correctly', () => {
    const result = sinFunction.handler(new Decimal(Math.PI));
    expect(result.toString()).toBe('0');
  });

  it('should have correct metadata', () => {
    expect(sinFunction.name).toBe('sin');
    expect(sinFunction.description).toBe('Calculates the sine of a number (in radians). Returns the sine value as a decimal.');
    expect(sinFunction.returnType).toBe('Decimal');
    expect(sinFunction.parameters).toHaveLength(1);
    expect(sinFunction.parameters[0].name).toBe('x');
    expect(sinFunction.parameters[0].required).toBe(true);
  });
}); 