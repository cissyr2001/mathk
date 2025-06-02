import Decimal from 'decimal.js';
import { lnFunction } from './ln';

describe('ln function', () => {
  describe('special values', () => {
    it('should return 0 for 1', () => {
      expect(lnFunction.handler(new Decimal(1)).toString()).toBe('0');
    });

    it('should return 1 for e', () => {
      const result = lnFunction.handler(new Decimal('2.7182818285')) as Decimal;
      expect(result.toDP(10).toString()).toBe('1');
    });
  });

  describe('integer inputs', () => {
    it('should calculate ln(10) correctly', () => {
      const result = lnFunction.handler(new Decimal(10)) as Decimal;
      expect(result.toDP(10).toString()).toBe('2.3025850930');
    });

    it('should calculate ln(2) correctly', () => {
      const result = lnFunction.handler(new Decimal(2)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.6931471806');
    });
  });

  describe('decimal inputs', () => {
    it('should calculate ln(0.5) correctly', () => {
      const result = lnFunction.handler(new Decimal('0.5')) as Decimal;
      expect(result.toDP(10).toString()).toBe('-0.6931471806');
    });

    it('should calculate ln(0.25) correctly', () => {
      const result = lnFunction.handler(new Decimal('0.25')) as Decimal;
      expect(result.toDP(10).toString()).toBe('-1.3862943611');
    });
  });

  describe('error cases', () => {
    it('should throw error for non-positive inputs', () => {
      expect(() => lnFunction.handler(new Decimal(0))).toThrow('Cannot calculate natural logarithm of non-positive number');
      expect(() => lnFunction.handler(new Decimal(-1))).toThrow('Cannot calculate natural logarithm of non-positive number');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(lnFunction.name).toBe('ln');
      expect(lnFunction.description).toContain('Calculates the natural logarithm of x');
      expect(lnFunction.returnType).toBe('Decimal');
      expect(lnFunction.parameters).toHaveLength(1);
      expect(lnFunction.parameters[0].name).toBe('x');
      expect(lnFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(lnFunction.examples).toHaveLength(2);
      expect(lnFunction.examples[0].title).toBe('Basic natural logarithm calculations');
      expect(lnFunction.examples[1].title).toBe('Natural logarithm with decimal numbers');
    });
  });
}); 