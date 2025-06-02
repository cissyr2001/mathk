import Decimal from 'decimal.js';
import { powFunction } from './pow';
import { CONSTANTS } from '../constants.constant';

describe('pow function', () => {
  const PI = CONSTANTS.PI as unknown as Decimal;

  describe('special values', () => {
    it('should return 1 for any number raised to 0', () => {
      expect(powFunction.handler(new Decimal(2), new Decimal(0)).toString()).toBe('1');
      expect(powFunction.handler(new Decimal(10), new Decimal(0)).toString()).toBe('1');
      expect(powFunction.handler(new Decimal(-5), new Decimal(0)).toString()).toBe('1');
    });

    it('should return the base for any number raised to 1', () => {
      expect(powFunction.handler(new Decimal(2), new Decimal(1)).toString()).toBe('2');
      expect(powFunction.handler(new Decimal(10), new Decimal(1)).toString()).toBe('10');
      expect(powFunction.handler(new Decimal(-5), new Decimal(1)).toString()).toBe('-5');
    });

    it('should return 1 for 0 raised to 0', () => {
      expect(powFunction.handler(new Decimal(0), new Decimal(0)).toString()).toBe('1');
    });
  });

  describe('integer exponents', () => {
    it('should calculate positive integer powers correctly', () => {
      expect(powFunction.handler(new Decimal(2), new Decimal(3)).toString()).toBe('8');
      expect(powFunction.handler(new Decimal(3), new Decimal(4)).toString()).toBe('81');
      expect(powFunction.handler(new Decimal(2), new Decimal(10)).toString()).toBe('1024');
    });

    it('should calculate negative integer powers correctly', () => {
      expect(powFunction.handler(new Decimal(2), new Decimal(-2)).toString()).toBe('0.25');
      expect((powFunction.handler(new Decimal(3), new Decimal(-1)) as Decimal).toDP(10).toString()).toBe('0.3333333333');
      expect((powFunction.handler(new Decimal(2), new Decimal(-3)) as Decimal).toDP(10).toString()).toBe('0.125');
    });

    it('should handle negative base with integer exponents', () => {
      expect(powFunction.handler(new Decimal(-2), new Decimal(4)).toString()).toBe('16');
      expect(powFunction.handler(new Decimal(-2), new Decimal(3)).toString()).toBe('-8');
      expect(powFunction.handler(new Decimal(-3), new Decimal(2)).toString()).toBe('9');
    });
  });

  describe('fractional exponents', () => {
    it('should calculate square roots and cube roots correctly', () => {
      expect(powFunction.handler(new Decimal(16), new Decimal('0.5')).toString()).toBe('4');
      expect((powFunction.handler(new Decimal(27), new Decimal('0.3333333333')) as Decimal).toDP(10).toString()).toBe('3');
      expect((powFunction.handler(new Decimal(8), new Decimal('0.6666666667')) as Decimal).toDP(10).toString()).toBe('4');
    });

    it('should calculate negative fractional powers correctly', () => {
      expect(powFunction.handler(new Decimal(4), new Decimal('-0.5')).toString()).toBe('0.5');
      expect((powFunction.handler(new Decimal(8), new Decimal('-0.3333333333')) as Decimal).toDP(10).toString()).toBe('0.5');
      expect((powFunction.handler(new Decimal(16), new Decimal('-0.25')) as Decimal).toDP(10).toString()).toBe('0.5');
    });
  });

  describe('error cases', () => {
    it('should throw error for 0 raised to negative power', () => {
      expect(() => powFunction.handler(new Decimal(0), new Decimal(-1))).toThrow('Cannot raise 0 to a negative power');
      expect(() => powFunction.handler(new Decimal(0), new Decimal(-2))).toThrow('Cannot raise 0 to a negative power');
    });

    it('should throw error for negative base with non-integer exponent', () => {
      expect(() => powFunction.handler(new Decimal(-2), new Decimal('0.5'))).toThrow('Cannot raise negative number to non-integer power');
      expect(() => powFunction.handler(new Decimal(-3), new Decimal('0.3333333333'))).toThrow('Cannot raise negative number to non-integer power');
    });
  });

  describe('metadata', () => {
    it('should have correct function metadata', () => {
      expect(powFunction.name).toBe('pow');
      expect(powFunction.description).toContain('Calculates x raised to the power y');
      expect(powFunction.returnType).toBe('Decimal');
      expect(powFunction.parameters).toHaveLength(2);
      expect(powFunction.parameters[0].name).toBe('x');
      expect(powFunction.parameters[1].name).toBe('y');
      expect(powFunction.parameters[0].required).toBe(true);
      expect(powFunction.parameters[1].required).toBe(true);
    });

    it('should have example code', () => {
      expect(powFunction.examples).toHaveLength(1);
      expect(powFunction.examples[0].title).toBe('Power operations with various exponents');
      expect(powFunction.examples[0].code).toContain('pow(@base, 0)');
      expect(powFunction.examples[0].code).toContain('pow(@base, 1)');
      expect(powFunction.examples[0].code).toContain('pow(@zero, @zero)');
      expect(powFunction.examples[0].code).toContain('pow(@base, 3)');
      expect(powFunction.examples[0].code).toContain('pow(@base, -2)');
      expect(powFunction.examples[0].code).toContain('pow(@base, 10)');
      expect(powFunction.examples[0].code).toContain('pow(16, 0.5)');
      expect(powFunction.examples[0].code).toContain('pow(27, 1/3)');
      expect(powFunction.examples[0].code).toContain('pow(8, 2/3)');
      expect(powFunction.examples[0].code).toContain('pow(4, -0.5)');
      expect(powFunction.examples[0].code).toContain('pow(@negBase, 4)');
      expect(powFunction.examples[0].code).toContain('pow(@negBase, 3)');
    });
  });
}); 