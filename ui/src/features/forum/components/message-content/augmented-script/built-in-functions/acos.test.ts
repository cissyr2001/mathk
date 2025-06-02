import Decimal from 'decimal.js';
import { acosFunction } from './acos';
import { CONSTANTS } from '../constants.constant';

describe('acos function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 0 for 1', () => {
      expect(acosFunction.handler(new Decimal(1)).toString()).toBe('0');
    });

    it('should return π/2 for 0', () => {
      const result = acosFunction.handler(new Decimal(0)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(2).toDP(10).toString());
    });

    it('should return π for -1', () => {
      const result = acosFunction.handler(new Decimal(-1)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.toDP(10).toString());
    });
  });

  describe('common values', () => {
    it('should calculate acos(0.5) correctly', () => {
      const result = acosFunction.handler(new Decimal(0.5)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(3).toDP(10).toString());
    });

    it('should calculate acos(0.7071) correctly', () => {
      const result = acosFunction.handler(new Decimal(0.7071)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(4).toDP(10).toString());
    });

    it('should calculate acos(0.8660) correctly', () => {
      const result = acosFunction.handler(new Decimal(0.8660)) as Decimal;
      expect(result.toDP(10).toString()).toBe(PI.dividedBy(6).toDP(10).toString());
    });
  });

  describe('degree conversions', () => {
    it('should calculate acos(0.5) in degrees correctly', () => {
      const result = acosFunction.handler(new Decimal(0.5)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('60');
    });

    it('should calculate acos(0.7071) in degrees correctly', () => {
      const result = acosFunction.handler(new Decimal(0.7071)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('45');
    });

    it('should calculate acos(0.8660) in degrees correctly', () => {
      const result = acosFunction.handler(new Decimal(0.8660)) as Decimal;
      const degrees = result.times(180).dividedBy(PI);
      expect(degrees.toDP(10).toString()).toBe('30');
    });
  });

  describe('error cases', () => {
    it('should throw error for values greater than 1', () => {
      expect(() => acosFunction.handler(new Decimal(1.1))).toThrow('Input must be between -1 and 1 inclusive');
      expect(() => acosFunction.handler(new Decimal(2))).toThrow('Input must be between -1 and 1 inclusive');
    });

    it('should throw error for values less than -1', () => {
      expect(() => acosFunction.handler(new Decimal(-1.1))).toThrow('Input must be between -1 and 1 inclusive');
      expect(() => acosFunction.handler(new Decimal(-2))).toThrow('Input must be between -1 and 1 inclusive');
    });
  });

  describe('edge cases', () => {
    it('should handle values very close to 1', () => {
      const result = acosFunction.handler(new Decimal('0.9999999999')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });

    it('should handle values very close to -1', () => {
      const result = acosFunction.handler(new Decimal('-0.9999999999')) as Decimal;
      expect(result.toString()).not.toBe('NaN');
      expect(result.toString()).not.toBe('Infinity');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(acosFunction.name).toBe('acos');
      expect(acosFunction.description).toContain('Calculates the arccosine');
      expect(acosFunction.returnType).toBe('Decimal');
      expect(acosFunction.parameters).toHaveLength(1);
      expect(acosFunction.parameters[0].name).toBe('x');
      expect(acosFunction.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(acosFunction.examples).toHaveLength(1);
      expect(acosFunction.examples[0].title).toBe('Arccosine calculations with various values');
      expect(acosFunction.examples[0].code).toContain('acos(1)');
      expect(acosFunction.examples[0].code).toContain('acos(0)');
      expect(acosFunction.examples[0].code).toContain('acos(-1)');
    });
  });
}); 