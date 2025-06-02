import Decimal from 'decimal.js';
import { cubeFunction } from './cube';

describe('cube function', () => {
  it('should calculate cube(3) correctly', () => {
    const result = cubeFunction.handler(new Decimal(3)) as Decimal;
    expect(result.toString()).toBe('27');
  });

  it('should calculate cube(2.5) correctly', () => {
    const result = cubeFunction.handler(new Decimal(2.5)) as Decimal;
    expect(result.toString()).toBe('15.625');
  });

  it('should calculate cube(-2) correctly', () => {
    const result = cubeFunction.handler(new Decimal(-2)) as Decimal;
    expect(result.toString()).toBe('-8');
  });

  it('should calculate cube(0) correctly', () => {
    const result = cubeFunction.handler(new Decimal(0)) as Decimal;
    expect(result.toString()).toBe('0');
  });

  it('should handle large numbers', () => {
    const result = cubeFunction.handler(new Decimal(1e3)) as Decimal;
    expect(result.toString()).toBe('1000000000');
  });

  it('should have correct metadata', () => {
    expect(cubeFunction.name).toBe('cube');
    expect(cubeFunction.description).toBe('Calculates x cubed (x^3) for any real number.');
    expect(cubeFunction.returnType).toBe('Decimal');
    expect(cubeFunction.parameters).toHaveLength(1);
    expect(cubeFunction.parameters[0].name).toBe('x');
    expect(cubeFunction.parameters[0].required).toBe(true);
  });
}); 