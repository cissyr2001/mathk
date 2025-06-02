import Decimal from 'decimal.js';
import { atanFunction } from './atan';
import { CONSTANTS } from '../constants.constant';

describe('atan function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 0 for 0', () => {
      expect(atanFunction.handler(new Decimal(0)).toString()).toBe('0');
    });

    it('should return π/4 for 1', () => {
      const result = atanFunction.handler(new Decimal(1)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(4).toDP(10).toString());
    });

    it('should return -π/4 for -1', () => {
      const result = atanFunction.handler(new Decimal(-1)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(4).negated().toDP(10).toString());
    });

    it('should return π/2 for large positive values', () => {
      const result = atanFunction.handler(new Decimal(1e10)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.div(2).toDP(10).toString());
    });

    it('should return -π/2 for large negative values', () => {
      const result = atanFunction.handler(new Decimal(-1e10)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.div(2).neg().toDP(10).toString());
    });
  });

  describe('common values', () => {
    it('should calculate atan(0.5774) correctly', () => {
      const result = atanFunction.handler(new Decimal(0.5774)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(6).toDP(10).toString());
    });

    it('should calculate atan(1.7321) correctly', () => {
      const result = atanFunction.handler(new Decimal(1.7321)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(3).toDP(10).toString());
    });
  });

  describe('degree conversions', () => {
    it('should calculate atan(0.5774) in degrees correctly', () => {
      const result = atanFunction.handler(new Decimal(0.5774)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('30');
    });

    it('should calculate atan(1) in degrees correctly', () => {
      const result = atanFunction.handler(new Decimal(1)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('45');
    });

    it('should calculate atan(1.7321) in degrees correctly', () => {
      const result = atanFunction.handler(new Decimal(1.7321)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('60');
    });
  });

  describe('range checks', () => {
    it('should return values in [-π/2, π/2]', () => {
      const result = atanFunction.handler(new Decimal(1000)) as Decimal;
      expect(result.lessThan(PI.dividedBy(2))).toBe(true);
      expect(result.greaterThan(PI.dividedBy(2).negated())).toBe(true);
    });

    it('should handle very large negative values', () => {
      const result = atanFunction.handler(new Decimal(-1000)) as Decimal;
      expect(result.lessThan(PI.dividedBy(2))).toBe(true);
      expect(result.greaterThan(PI.dividedBy(2).negated())).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle very large values', () => {
      const result = atanFunction.handler(new Decimal('1e10')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle very small values', () => {
      const result = atanFunction.handler(new Decimal('1e-10')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(atanFunction.name).toBe('atan');
      expect(atanFunction.description).toContain('Calculates the arctangent');
      expect(atanFunction.returnType).toBe('Decimal');
      expect(atanFunction.parameters).toHaveLength(1);
      expect(atanFunction.parameters[0].name).toBe('x');
      expect(atanFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(atanFunction.examples).toHaveLength(1);
      expect(atanFunction.examples[0].title).toBe('Arctangent calculations with various values');
      expect(atanFunction.examples[0].code).toContain('atan(0)');
      expect(atanFunction.examples[0].code).toContain('atan(1)');
      expect(atanFunction.examples[0].code).toContain('atan(-1)');
    });
  });
}); 