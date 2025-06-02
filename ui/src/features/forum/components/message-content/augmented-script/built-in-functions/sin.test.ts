import Decimal from 'decimal.js';
import { sinFunction } from './sin';
import { CONSTANTS } from '../constants.constant';

describe('sin function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 0 for 0', () => {
      expect(sinFunction.handler(new Decimal(0)).toString()).toBe('0');
    });

    it('should return 1 for π/2', () => {
      const result = sinFunction.handler(PI.dividedBy(2)) as Decimal;
      expect(result.toDP(10).toString()).toBe('1');
    });

    it('should return 0 for π', () => {
      const result = sinFunction.handler(PI) as Decimal;
      expect(result.toDP(10).toString()).toBe('0');
    });

    it('should return -1 for 3π/2', () => {
      const result = sinFunction.handler(PI.times(3).dividedBy(2)) as Decimal;
      expect(result.toDP(10).toString()).toBe('-1');
    });
  });

  describe('common angles', () => {
    it('should calculate sin(π/6) correctly', () => {
      const result = sinFunction.handler(PI.dividedBy(6)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5');
    });

    it('should calculate sin(π/4) correctly', () => {
      const result = sinFunction.handler(PI.dividedBy(4)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.7071067812');
    });

    it('should calculate sin(π/3) correctly', () => {
      const result = sinFunction.handler(PI.dividedBy(3)) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.8660254038');
    });
  });

  describe('degree conversions', () => {
    it('should calculate sin(30°) correctly', () => {
      const radians = new Decimal(30).times(PI).dividedBy(180);
      const result = sinFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5');
    });

    it('should calculate sin(45°) correctly', () => {
      const radians = new Decimal(45).times(PI).dividedBy(180);
      const result = sinFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.7071067812');
    });

    it('should calculate sin(60°) correctly', () => {
      const radians = new Decimal(60).times(PI).dividedBy(180);
      const result = sinFunction.handler(radians) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.8660254038');
    });
  });

  describe('periodicity', () => {
    it('should handle multiples of 2π', () => {
      const result1 = sinFunction.handler(PI.times(2)) as Decimal;
      const result2 = sinFunction.handler(PI.times(4)) as Decimal;
      expect(result1.toDP(10).toString()).toBe('0');
      expect(result2.toDP(10).toString()).toBe('0');
    });

    it('should handle negative angles', () => {
      const result1 = sinFunction.handler(PI.dividedBy(2).negated()) as Decimal;
      const result2 = sinFunction.handler(PI.negated()) as Decimal;
      expect(result1.toDP(10).toString()).toBe('-1');
      expect(result2.toDP(10).toString()).toBe('0');
    });
  });

  describe('edge cases', () => {
    it('should handle very large angles', () => {
      const result = sinFunction.handler(PI.times(1000)) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle very small angles', () => {
      const result = sinFunction.handler(new Decimal('0.0000000001')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(sinFunction.name).toBe('sin');
      expect(sinFunction.description).toContain('Calculates the sine');
      expect(sinFunction.returnType).toBe('Decimal');
      expect(sinFunction.parameters).toHaveLength(1);
      expect(sinFunction.parameters[0].name).toBe('x');
      expect(sinFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(sinFunction.examples).toHaveLength(1);
      expect(sinFunction.examples[0].title).toBe('Sine calculations with various angles');
      expect(sinFunction.examples[0].code).toContain('sin(0)');
      expect(sinFunction.examples[0].code).toContain('sin(π/2)');
      expect(sinFunction.examples[0].code).toContain('sin(π)');
    });
  });
}); 