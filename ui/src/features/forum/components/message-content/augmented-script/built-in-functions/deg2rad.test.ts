import Decimal from 'decimal.js';
import { deg2radFunction } from './deg2rad';

describe('deg2rad function', () => {
  it('should convert 180 degrees to radians correctly', () => {
    const result = deg2radFunction.handler(new Decimal(180)) as Decimal;
    expect(result.toDP(10).toString()).toBe('3.1415926536'); // π
  });

  it('should convert -90 degrees to radians correctly', () => {
    const result = deg2radFunction.handler(new Decimal(-90)) as Decimal;
    expect(result.toDP(10).toString()).toBe('-1.5707963268'); // -π/2
  });

  it('should convert 0 degrees to radians correctly', () => {
    const result = deg2radFunction.handler(new Decimal(0)) as Decimal;
    expect(result.toString()).toBe('0');
  });

  it('should convert 45.5 degrees to radians correctly', () => {
    const result = deg2radFunction.handler(new Decimal(45.5)) as Decimal;
    expect(result.toDP(10).toString()).toBe('0.7941248097');
  });

  it('should handle large angles', () => {
    const result = deg2radFunction.handler(new Decimal(360)) as Decimal;
    expect(result.toDP(10).toString()).toBe('6.2831853072'); // 2π
  });

  it('should have correct metadata', () => {
    expect(deg2radFunction.name).toBe('deg2rad');
    expect(deg2radFunction.description).toBe('Converts an angle from degrees to radians.');
    expect(deg2radFunction.returnType).toBe('Decimal');
    expect(deg2radFunction.parameters).toHaveLength(1);
    expect(deg2radFunction.parameters[0].name).toBe('x');
    expect(deg2radFunction.parameters[0].required).toBe(true);
  });
}); 