import Decimal from 'decimal.js';
import { expFunction } from './exp';

describe('exp function', () => {
  describe('special values', () => {
    it('should return 1 for 0', () => {
      expect(expFunction.handler(new Decimal(0)).toString()).toBe('1');
    });

    it('should return e for 1', () => {
      const result = expFunction.handler(new Decimal(1)) as Decimal;
      expect(result.toDP(10).toString()).toBe('2.7182818285');
    });
  });

  describe('integer exponents', () => {
    it('should calculate e^2 correctly', () => {
      const result = expFunction.handler(new Decimal(2)) as Decimal;
      expect(result.toDP(10).toString()).toBe('7.3890560989');
    });

    it('should calculate e^(-1) correctly', () => {
      const result = expFunction.handler(new Decimal(-1)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.3678794412');
    });
  });

  describe('fractional exponents', () => {
    it('should calculate e^0.5 correctly', () => {
      const result = expFunction.handler(new Decimal('0.5')) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.6487212707');
    });

    it('should calculate e^0.25 correctly', () => {
      const result = expFunction.handler(new Decimal('0.25')) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.2840254167');
    });
  });

  describe('error cases', () => {
    it('should throw error for very large exponents', () => {
      expect(() => expFunction.handler(new Decimal('1000'))).toThrow('Result too large to calculate');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(expFunction.name).toBe('exp');
      expect(expFunction.description).toContain('Calculates e raised to the power x');
      expect(expFunction.returnType).toBe('Decimal');
      expect(expFunction.parameters).toHaveLength(1);
      expect(expFunction.parameters[0].name).toBe('x');
      expect(expFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(expFunction.examples).toHaveLength(2);
      expect(expFunction.examples[0].title).toBe('Basic exponential calculations');
      expect(expFunction.examples[1].title).toBe('Exponential with fractional exponents');
    });
  });
}); 