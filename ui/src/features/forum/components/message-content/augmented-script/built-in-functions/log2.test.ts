import Decimal from 'decimal.js';
import { log2Function } from './log2';

describe('log2 function', () => {
  describe('special values', () => {
    it('should return 0 for 1', () => {
      expect(log2Function.handler(new Decimal(1)).toString()).toBe('0');
    });

    it('should return 1 for 2', () => {
      expect(log2Function.handler(new Decimal(2)).toString()).toBe('1');
    });
  });

  describe('integer inputs', () => {
    it('should calculate log₂(8) correctly', () => {
      expect(log2Function.handler(new Decimal(8)).toString()).toBe('3');
    });

    it('should calculate log₂(1024) correctly', () => {
      expect(log2Function.handler(new Decimal(1024)).toString()).toBe('10');
    });
  });

  describe('decimal inputs', () => {
    it('should calculate log₂(0.5) correctly', () => {
      expect(log2Function.handler(new Decimal('0.5')).toString()).toBe('-1');
    });

    it('should calculate log₂(0.25) correctly', () => {
      expect(log2Function.handler(new Decimal('0.25')).toString()).toBe('-2');
    });
  });

  describe('error cases', () => {
    it('should throw error for non-positive inputs', () => {
      expect(() => log2Function.handler(new Decimal(0))).toThrow('Cannot calculate base-2 logarithm of non-positive number');
      expect(() => log2Function.handler(new Decimal(-1))).toThrow('Cannot calculate base-2 logarithm of non-positive number');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(log2Function.name).toBe('log2');
      expect(log2Function.description).toContain('Calculates the base-2 logarithm of x');
      expect(log2Function.returnType).toBe('Decimal');
      expect(log2Function.parameters).toHaveLength(1);
      expect(log2Function.parameters[0].name).toBe('x');
      expect(log2Function.parameters[0].required).toBe(true);
    });

    it('should have example code', () => {
      expect(log2Function.examples).toHaveLength(2);
      expect(log2Function.examples[0].title).toBe('Basic base-2 logarithm calculations');
      expect(log2Function.examples[1].title).toBe('Base-2 logarithm with decimal numbers');
    });
  });
}); 