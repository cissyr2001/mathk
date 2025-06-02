import Decimal from 'decimal.js';
import { rad2degFunction } from './rad2deg';

describe('rad2deg function', () => {
  it('should convert π radians to degrees correctly', () => {
    const pi = Decimal.acos(-1);
    const result = rad2degFunction.handler(pi) as Decimal;
    expect(result.toDP(10).toString()).toBe('180');
  });

  it('should convert π/2 radians to degrees correctly', () => {
    const piHalf = Decimal.acos(-1).div(2);
    const result = rad2degFunction.handler(piHalf) as Decimal;
    expect(result.toDP(10).toString()).toBe('90');
  });

  it('should convert -π/2 radians to degrees correctly', () => {
    const negPiHalf = Decimal.acos(-1).div(2).neg();
    const result = rad2degFunction.handler(negPiHalf) as Decimal;
    expect(result.toDP(10).toString()).toBe('-90');
  });

  it('should convert 0 radians to degrees correctly', () => {
    const result = rad2degFunction.handler(new Decimal(0)) as Decimal;
    expect(result.toString()).toBe('0');
  });

  it('should convert 1.5708 radians to degrees correctly', () => {
    const result = rad2degFunction.handler(new Decimal(1.5708)) as Decimal;
    expect(result.toDP(10).toString()).toBe('90.0000000000');
  });

  it('should handle large angles', () => {
    const twoPi = Decimal.acos(-1).mul(2);
    const result = rad2degFunction.handler(twoPi) as Decimal;
    expect(result.toDP(10).toString()).toBe('360');
  });

  it('should have correct metadata', () => {
    expect(rad2degFunction.name).toBe('rad2deg');
    expect(rad2degFunction.description).toBe('Converts an angle from radians to degrees.');
    expect(rad2degFunction.returnType).toBe('Decimal');
    expect(rad2degFunction.parameters).toHaveLength(1);
    expect(rad2degFunction.parameters[0].name).toBe('x');
    expect(rad2degFunction.parameters[0].required).toBe(true);
  });
}); 