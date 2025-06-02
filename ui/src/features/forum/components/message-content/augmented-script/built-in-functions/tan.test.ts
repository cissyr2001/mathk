import Decimal from 'decimal.js';
import { tanFunction } from './tan';
import { CONSTANTS } from '../constants.constant';

describe('tan function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 0 for 0', () => {
      expect(tanFunction.handler(new Decimal(0)).toString()).toBe('0');
    });

    it('should return 0 for π', () => {
      const result = tanFunction.handler(PI) as Decimal;
      expect(result.toString()).toBe('0');
    });

    it('should return 1 for π/4', () => {
      const result = tanFunction.handler(PI.dividedBy(4)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1');
    });
  });

  describe('common angles', () => {
    it('should calculate tan(π/6) correctly', () => {
      const result = tanFunction.handler(PI.dividedBy(6)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5773502692');
    });

    it('should calculate tan(π/3) correctly', () => {
      const result = tanFunction.handler(PI.dividedBy(3)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.732050808');
    });
  });

  describe('degree conversions', () => {
    it('should calculate tan(30°) correctly', () => {
      const radians = new Decimal(30).times(PI).dividedBy(180);
      const result = tanFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5773502692');
    });

    it('should calculate tan(45°) correctly', () => {
      const radians = new Decimal(45).times(PI).dividedBy(180);
      const result = tanFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('1');
    });

    it('should calculate tan(60°) correctly', () => {
      const radians = new Decimal(60).times(PI).dividedBy(180);
      const result = tanFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.732050808');
    });
  });

  describe('undefined cases', () => {
    it('should throw error for π/2', () => {
      expect(() => tanFunction.handler(PI.dividedBy(2))).toThrow('Tangent is undefined for odd multiples of π/2');
    });

    it('should throw error for 3π/2', () => {
      expect(() => tanFunction.handler(PI.times(3).dividedBy(2))).toThrow('Tangent is undefined for odd multiples of π/2');
    });
  });

  describe('periodicity', () => {
    it('should handle π periodicity', () => {
      const result1 = tanFunction.handler(new Decimal(0)) as Decimal;
      const result2 = tanFunction.handler(PI) as Decimal;
      expect(result1.toString()).toBe(result2.toString());
    });

    it('should handle negative angles', () => {
      const result1 = tanFunction.handler(PI.dividedBy(4)) as Decimal;
      const result2 = tanFunction.handler(PI.dividedBy(4).negated()) as Decimal;
      expect(result1.toString()).toBe(result2.negated().toString());
    });
  });

  describe('edge cases', () => {
    it('should handle very large angles', () => {
      const result = tanFunction.handler(PI.times(1000)) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle very small angles', () => {
      const result = tanFunction.handler(new Decimal('0.0000000001')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(tanFunction.name).toBe('tan');
      expect(tanFunction.description).toContain('Calculates the tangent');
      expect(tanFunction.returnType).toBe('Decimal');
      expect(tanFunction.parameters).toHaveLength(1);
      expect(tanFunction.parameters[0].name).toBe('x');
      expect(tanFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(tanFunction.examples).toHaveLength(1);
      expect(tanFunction.examples[0].title).toBe('Tangent calculations with various angles');
      expect(tanFunction.examples[0].code).toContain('tan(0)');
      expect(tanFunction.examples[0].code).toContain('tan(π)');
      expect(tanFunction.examples[0].code).toContain('tan(π/4)');
    });
  });
}); 