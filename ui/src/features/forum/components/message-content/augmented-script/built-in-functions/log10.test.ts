import Decimal from 'decimal.js';
import { log10Function } from './log10';
import { CONSTANTS } from '../constants.constant';

describe('log10 function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 0 for 1', () => {
      expect(log10Function.handler(new Decimal(1)).toString()).toBe('0');
    });

    it('should return 1 for 10', () => {
      expect(log10Function.handler(new Decimal(10)).toString()).toBe('1');
    });

    it('should return 2 for 100', () => {
      expect(log10Function.handler(new Decimal(100)).toString()).toBe('2');
    });

    it('should return 3 for 1000', () => {
      expect(log10Function.handler(new Decimal(1000)).toString()).toBe('3');
    });
  });

  describe('decimal inputs', () => {
    it('should calculate log₁₀(0.1) correctly', () => {
      expect(log10Function.handler(new Decimal('0.1')).toString()).toBe('-1');
    });

    it('should calculate log₁₀(0.01) correctly', () => {
      expect(log10Function.handler(new Decimal('0.01')).toString()).toBe('-2');
    });

    it('should calculate log₁₀(0.001) correctly', () => {
      expect(log10Function.handler(new Decimal('0.001')).toString()).toBe('-3');
    });

    it('should calculate log₁₀(0.5) correctly', () => {
      const result = log10Function.handler(new Decimal('0.5')) as Decimal;
      expect(result.toDP(10).toString()).toBe('-0.3010299957');
    });
  });

  describe('non-integer powers of 10', () => {
    it('should calculate log₁₀(√10) correctly', () => {
      const result = log10Function.handler(new Decimal('3.1622776602')) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.5');
    });

    it('should calculate log₁₀(∛10) correctly', () => {
      const result = log10Function.handler(new Decimal('2.1544346900')) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.3333333333');
    });

    it('should calculate log₁₀(π) correctly', () => {
      const result = log10Function.handler(PI) as Decimal;
      expect(result.toDP(10).toString()).toBe('0.4971498727');
    });
  });

  describe('error cases', () => {
    it('should throw error for non-positive inputs', () => {
      expect(() => log10Function.handler(new Decimal(0))).toThrow('Cannot calculate base-10 logarithm of non-positive number');
      expect(() => log10Function.handler(new Decimal(-1))).toThrow('Cannot calculate base-10 logarithm of non-positive number');
      expect(() => log10Function.handler(new Decimal(-0.1))).toThrow('Cannot calculate base-10 logarithm of non-positive number');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(log10Function.name).toBe('log10');
      expect(log10Function.description).toContain('Calculates the base-10 logarithm of x');
      expect(log10Function.returnType).toBe('Decimal');
      expect(log10Function.parameters).toHaveLength(1);
      expect(log10Function.parameters[0].name).toBe('x');
      expect(log10Function.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(log10Function.examples).toHaveLength(1);
      expect(log10Function.examples[0].title).toBe('Base-10 logarithm calculations with various values');
      expect(log10Function.examples[0].code).toContain('log₁₀(1)');
      expect(log10Function.examples[0].code).toContain('log₁₀(10)');
      expect(log10Function.examples[0].code).toContain('log₁₀(100)');
      expect(log10Function.examples[0].code).toContain('log₁₀(1000)');
      expect(log10Function.examples[0].code).toContain('log₁₀(0.1)');
      expect(log10Function.examples[0].code).toContain('log₁₀(0.01)');
      expect(log10Function.examples[0].code).toContain('log₁₀(0.001)');
      expect(log10Function.examples[0].code).toContain('log₁₀(√10)');
      expect(log10Function.examples[0].code).toContain('log₁₀(∛10)');
      expect(log10Function.examples[0].code).toContain('log₁₀(π)');
    });
  });
}); 