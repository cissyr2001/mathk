import React from 'react';
import Decimal from 'decimal.js';
import type { PrecisionLevel } from './numeric-text.types';
import { hasMorePrecision } from './numeric-text.utils';

export const formatNumber = (
  num: Decimal, 
  sigFigs: number, 
  precisionLevel: PrecisionLevel
): string | React.JSX.Element => {
  if (num.isZero()) return '0';
  
  const absNum = num.abs();
  const log10 = absNum.log(10);
  const exponent = Math.floor(log10.toNumber());
  
  if (Math.abs(exponent) > 3) {
    return formatScientific(num, sigFigs, precisionLevel);
  }
  
  if (sigFigs === 36) {
    const str = num.toString();
    const digits = str.replace(/[^0-9]/g, '');
    const hasDecimal = str.includes('.');
    const leadingZeros = str.match(/^0*\.0*/)?.[0]?.replace(/\./g, '').length || 0;
    const significantDigits = digits.length - (hasDecimal && leadingZeros > 0 ? leadingZeros : 0);
    
    if (significantDigits <= 36 && !str.includes('e') && !str.includes('E')) {
      const result = str;
      return hasMorePrecision(num, precisionLevel) ? result + '...' : result;
    }
  }
  
  const result = num.toSignificantDigits(sigFigs).toString();
  return sigFigs === 36 && hasMorePrecision(num, precisionLevel) ? result + '...' : result;
};

export const formatScientific = (
  num: Decimal, 
  sigFigs: number,
  precisionLevel: PrecisionLevel
): React.JSX.Element => {
  if (num.isZero()) return <span>0</span>;
  
  const sign = num.isNegative() ? '-' : '';
  const absNum = num.abs();
  const log10 = absNum.log(10);
  const exponent = Math.floor(log10.toNumber());
  const mantissa = absNum.div(Decimal.pow(10, exponent));
  
  let mantissaStr;
  if (sigFigs === 1) {
    mantissaStr = mantissa.toFixed(0);
  } else {
    mantissaStr = mantissa.toFixed(sigFigs - 1);
    mantissaStr = mantissaStr.replace(/\.?0+$/, '');
  }
  
  if (sigFigs === 36 && hasMorePrecision(num, precisionLevel)) {
    mantissaStr += '...';
  }
  
  if (exponent === 0) {
    return <span>{sign + mantissaStr}</span>;
  }
  
  return (
    <span>
      {sign}{mantissaStr} × 10<sup>{exponent}</sup>
    </span>
  );
}; 