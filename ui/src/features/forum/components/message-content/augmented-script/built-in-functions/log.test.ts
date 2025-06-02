import Decimal from 'decimal.js';
import { logFunction } from './log';
import { CONSTANTS } from '../constants.constant';

describe('log function', () => {
  const E = CONSTANTS.E as unknown as Decimal;

  describe('special cases', () => {
    it('should return 0 for log(base, 1)', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(1)).toString()).toBe('0');
      expect(logFunction.handler(new Decimal(10), new Decimal(1)).toString()).toBe('0');
      expect(logFunction.handler(E, new Decimal(1)).toString()).toBe('0');
    });

    it('should return 1 for log(base, base)', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(2)).toString()).toBe('1');
      expect(logFunction.handler(new Decimal(10), new Decimal(10)).toString()).toBe('1');
      expect(logFunction.handler(E, E).toString()).toBe('1');
    });
  });

  describe('common values', () => {
    it('should calculate log₂(4) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(4)).toString()).toBe('2');
    });

    it('should calculate log₂(8) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(8)).toString()).toBe('3');
    });

    it('should calculate log₂(16) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(16)).toString()).toBe('4');
    });

    it('should calculate natural logarithm correctly', () => {
      expect((logFunction.handler(E, new Decimal(10)) as Decimal).toDP(10).toString()).toBe('2.3025850930');
      expect((logFunction.handler(E, new Decimal(2)) as Decimal).toDP(10).toString()).toBe('0.6931471806');
    });
  });

  describe('decimal values', () => {
    it('should calculate log₂(0.5) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(0.5)).toString()).toBe('-1');
    });

    it('should calculate log₂(0.25) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(0.25)).toString()).toBe('-2');
    });

    it('should calculate log₂(0.125) correctly', () => {
      expect(logFunction.handler(new Decimal(2), new Decimal(0.125)).toString()).toBe('-3');
    });
  });

  describe('error cases', () => {
    it('should throw error for base ≤ 0', () => {
      expect(() => logFunction.handler(new Decimal(0), new Decimal(1))).toThrow('Base must be a positive number not equal to 1');
      expect(() => logFunction.handler(new Decimal(-1), new Decimal(1))).toThrow('Base must be a positive number not equal to 1');
    });

    it('should throw error for base = 1', () => {
      expect(() => logFunction.handler(new Decimal(1), new Decimal(1))).toThrow('Base must be a positive number not equal to 1');
    });

    it('should throw error for x ≤ 0', () => {
      expect(() => logFunction.handler(new Decimal(2), new Decimal(0))).toThrow('Input must be a positive number');
      expect(() => logFunction.handler(new Decimal(2), new Decimal(-1))).toThrow('Input must be a positive number');
    });

    it('should throw error for overflow cases', () => {
      expect(() => logFunction.handler(new Decimal(2), new Decimal('1e1000'))).toThrow('Result too large to calculate');
    });
  });

  describe('edge cases', () => {
    it('should handle very small positive inputs', () => {
      const result = logFunction.handler(new Decimal(2), new Decimal('1e-10')) as Decimal;
      expect(result.toString()).toBe('-33.2192809489');
    });

    it('should handle very large inputs', () => {
      const result = logFunction.handler(new Decimal(2), new Decimal('1e10')) as Decimal;
      expect(result.toString()).toBe('33.2192809489');
    });

    it('should handle decimal precision correctly', () => {
      const result = logFunction.handler(new Decimal(2), new Decimal('3.14159265359')) as Decimal;
      expect(result.toDP(10).toString()).toBe('1.6514961295');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(logFunction.name).toBe('log');
      expect(logFunction.description).toContain('Calculates the logarithm');
      expect(logFunction.returnType).toBe('Decimal');
      expect(logFunction.parameters).toHaveLength(2);
      expect(logFunction.parameters[0].name).toBe('base');
      expect(logFunction.parameters[1].name).toBe('x');
      expect(logFunction.parameters[0].required).toBe(true);
      expect(logFunction.parameters[1].required).toBe(true);
    });

    it('should have example code', () => {
      expect(logFunction.examples).toHaveLength(1);
      expect(logFunction.examples[0].title).toBe('Logarithm calculations with various bases and values');
      expect(logFunction.examples[0].code).toContain('log(2, 1)');
      expect(logFunction.examples[0].code).toContain('log(10, 1)');
      expect(logFunction.examples[0].code).toContain('log(e, 1)');
    });
  });
}); 