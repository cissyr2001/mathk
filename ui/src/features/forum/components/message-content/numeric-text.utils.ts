import Decimal from 'decimal.js';
import type { PrecisionLevel } from './numeric-text.types';

export const getSigFigs = (level: PrecisionLevel): number => {
  switch (level) {
    case 1: return 9;
    case 2: return 18;
    case 3: return 36;
    default: return 9;
  }
};

export const enablePrecisionRotation = (decimal: Decimal): boolean => {
  if (decimal.isZero()) return false;
  
  const fullStr = decimal.toString();
  let cleanStr = fullStr.replace(/^-/, '');
  
  if (cleanStr.includes('e') || cleanStr.includes('E')) {
    const mantissaPart = cleanStr.split(/[eE]/)[0];
    const digits = mantissaPart.replace(/[^0-9]/g, '');
    return digits.length > 9;
  }
  
  if (cleanStr.includes('.')) {
    const [intPart, decPart] = cleanStr.split('.');
    
    if (intPart === '0' || intPart === '') {
      const decDigits = decPart.replace(/^0+/, '');
      return decDigits.length > 9;
    } else {
      const allDigits = (intPart + decPart).replace(/^0+/, '');
      return allDigits.length > 9;
    }
  } else {
    const digits = cleanStr.replace(/^0+/, '') || '0';
    return digits.length > 9;
  }
};

export const hasMorePrecision = (decimal: Decimal, precisionLevel: PrecisionLevel): boolean => {
  if (!enablePrecisionRotation(decimal) || precisionLevel !== 3) return false;
  
  const fullStr = decimal.toString();
  if (decimal.isZero()) return false;
  
  let cleanStr = fullStr.replace(/^-/, '');
  
  if (cleanStr.includes('e') || cleanStr.includes('E')) {
    const mantissaPart = cleanStr.split(/[eE]/)[0];
    const digits = mantissaPart.replace(/[^0-9]/g, '');
    return digits.length > 36;
  }
  
  if (cleanStr.includes('.')) {
    const [intPart, decPart] = cleanStr.split('.');
    
    if (intPart === '0' || intPart === '') {
      const decDigits = decPart.replace(/^0+/, '');
      return decDigits.length > 36;
    } else {
      const allDigits = (intPart + decPart).replace(/^0+/, '');
      return allDigits.length > 36;
    }
  } else {
    const digits = cleanStr.replace(/^0+/, '') || '0';
    return digits.length > 36;
  }
}; 