import Decimal from 'decimal.js';
import { cosFunction } from './cos';
import { CONSTANTS } from '../constants.constant';

describe('cos function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 1 for 0', () => {
      expect(cosFunction.handler(new Decimal(0)).toString()).toBe('1');
    });

    it('should return 0 for π/2', () => {
      const result = cosFunction.handler(PI.dividedBy(2)) as Decimal;
      expect(result.toString()).toBe('0');
    });

    it('should return -1 for π', () => {
      const result = cosFunction.handler(PI) as Decimal;
      expect(result.toString()).toBe('-1');
    });

    it('should return 0 for 3π/2', () => {
      const result = cosFunction.handler(PI.times(3).dividedBy(2)) as Decimal;
      expect(result.toString()).toBe('0');
    });
  });

  describe('common angles', () => {
    it('should calculate cos(π/6) correctly', () => {
      const result = cosFunction.handler(PI.dividedBy(6)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.8660254038');
    });

    it('should calculate cos(π/4) correctly', () => {
      const result = cosFunction.handler(PI.dividedBy(4)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.7071067812');
    });

    it('should calculate cos(π/3) correctly', () => {
      const result = cosFunction.handler(PI.dividedBy(3)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5');
    });
  });

  describe('degree conversions', () => {
    it('should calculate cos(60°) correctly', () => {
      const radians = new Decimal(60).times(PI).dividedBy(180);
      const result = cosFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5');
    });

    it('should calculate cos(45°) correctly', () => {
      const radians = new Decimal(45).times(PI).dividedBy(180);
      const result = cosFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.7071067812');
    });

    it('should calculate cos(30°) correctly', () => {
      const radians = new Decimal(30).times(PI).dividedBy(180);
      const result = cosFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.8660254038');
    });
  });

  describe('periodicity', () => {
    it('should handle 2π periodicity', () => {
      const result1 = cosFunction.handler(new Decimal(0)) as Decimal;
      const result2 = cosFunction.handler(PI.times(2)) as Decimal;
      expect(result1.toString()).toBe(result2.toString());
    });

    it('should handle negative angles', () => {
      const result1 = cosFunction.handler(PI.dividedBy(3)) as Decimal;
      const result2 = cosFunction.handler(PI.dividedBy(3).negated()) as Decimal;
      expect(result1.toString()).toBe(result2.toString());
    });
  });

  describe('edge cases', () => {
    it('should handle very large angles', () => {
      const result = cosFunction.handler(PI.times(1000)) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle very small angles', () => {
      const result = cosFunction.handler(new Decimal('0.0000000001')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(cosFunction.name).toBe('cos');
      expect(cosFunction.description).toContain('Calculates the cosine');
      expect(cosFunction.returnType).toBe('Decimal');
      expect(cosFunction.parameters).toHaveLength(1);
      expect(cosFunction.parameters[0].name).toBe('x');
      expect(cosFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(cosFunction.examples).toHaveLength(1);
      expect(cosFunction.examples[0].title).toBe('Cosine calculations with various angles');
      expect(cosFunction.examples[0].code).toContain('cos(0)');
      expect(cosFunction.examples[0].code).toContain('cos(π/2)');
      expect(cosFunction.examples[0].code).toContain('cos(π)');
    });
  });
}); 