import Decimal from 'decimal.js';
import { sqrtFunction } from './sqrt';

describe('sqrt function', () => {
  describe('special values', () => {
    it('should return 0 for 0', () => {
      expect(sqrtFunction.handler(new Decimal(0)).toString()).toBe('0');
    });

    it('should return 1 for 1', () => {
      expect(sqrtFunction.handler(new Decimal(1)).toString()).toBe('1');
    });

    it('should return 2 for 4', () => {
      expect(sqrtFunction.handler(new Decimal(4)).toString()).toBe('2');
    });

    it('should return 3 for 9', () => {
      expect(sqrtFunction.handler(new Decimal(9)).toString()).toBe('3');
    });
  });

  describe('perfect squares', () => {
    it('should calculate sqrt(16) correctly', () => {
      expect(sqrtFunction.handler(new Decimal(16)).toString()).toBe('4');
    });

    it('should calculate sqrt(25) correctly', () => {
      expect(sqrtFunction.handler(new Decimal(25)).toString()).toBe('5');
    });

    it('should calculate sqrt(36) correctly', () => {
      expect(sqrtFunction.handler(new Decimal(36)).toString()).toBe('6');
    });
  });

  describe('irrational numbers', () => {
    it('should calculate sqrt(2) correctly', () => {
      const result = sqrtFunction.handler(new Decimal(2)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.4142135624');
    });

    it('should calculate sqrt(3) correctly', () => {
      const result = sqrtFunction.handler(new Decimal(3)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.7320508076');
    });

    it('should calculate sqrt(5) correctly', () => {
      const result = sqrtFunction.handler(new Decimal(5)) as Decimal;
      expect(result.toDP(10).toString()).toBe('2.2360679775');
    });
  });

  describe('decimal numbers', () => {
    it('should calculate sqrt(0.25) correctly', () => {
      expect(sqrtFunction.handler(new Decimal(0.25)).toString()).toBe('0.5');
    });

    it('should calculate sqrt(0.5) correctly', () => {
      const result = sqrtFunction.handler(new Decimal(0.5)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.7071067812');
    });

    it('should calculate sqrt(1.5) correctly', () => {
      const result = sqrtFunction.handler(new Decimal(1.5)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.2247448714');
    });
  });

  describe('error cases', () => {
    it('should throw error for negative numbers', () => {
      expect(() => sqrtFunction.handler(new Decimal(-1))).toThrow('Cannot calculate square root of negative number');
      expect(() => sqrtFunction.handler(new Decimal(-4))).toThrow('Cannot calculate square root of negative number');
    });
  });

  describe('edge cases', () => {
    it('should handle very small positive numbers', () => {
      const result = sqrtFunction.handler(new Decimal('1e-10')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle very large numbers', () => {
      const result = sqrtFunction.handler(new Decimal('1e10')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(sqrtFunction.name).toBe('sqrt');
      expect(sqrtFunction.description).toContain('Calculates the square root');
      expect(sqrtFunction.returnType).toBe('Decimal');
      expect(sqrtFunction.parameters).toHaveLength(1);
      expect(sqrtFunction.parameters[0].name).toBe('x');
      expect(sqrtFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(sqrtFunction.examples).toHaveLength(1);
      expect(sqrtFunction.examples[0].title).toBe('Square root calculations with various values');
      expect(sqrtFunction.examples[0].code).toContain('sqrt(0)');
      expect(sqrtFunction.examples[0].code).toContain('sqrt(1)');
      expect(sqrtFunction.examples[0].code).toContain('sqrt(4)');
    });
  });
}); 