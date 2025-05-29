import React, { useState } from 'react';
import Decimal from 'decimal.js';

interface NumericTextProps {
  value: Decimal | number;
  className?: string;
}

const NumericText: React.FC<NumericTextProps> = ({ value, className = '' }) => {
  const [precisionLevel, setPrecisionLevel] = useState(0); // 0=3, 1=9, 2=18, 3=36 sig figs
  
  const decimal = value instanceof Decimal ? value : new Decimal(value);
  
  // Calculate if precision rotation should be enabled based on the value
  const enablePrecisionRotation = (): boolean => {
    if (decimal.isZero()) return false;
    
    // Get the full string representation
    const fullStr = decimal.toString();
    
    // Remove sign for counting
    let cleanStr = fullStr.replace(/^-/, '');
    
    // Handle scientific notation
    if (cleanStr.includes('e') || cleanStr.includes('E')) {
      const mantissaPart = cleanStr.split(/[eE]/)[0];
      const digits = mantissaPart.replace(/[^0-9]/g, '');
      return digits.length > 8; // More than 8 sig figs
    }
    
    // For regular notation, check if we have more than 8 significant digits
    if (cleanStr.includes('.')) {
      const [intPart, decPart] = cleanStr.split('.');
      
      if (intPart === '0' || intPart === '') {
        // Number like 0.001234 - count digits after leading zeros
        const decDigits = decPart.replace(/^0+/, '');
        return decDigits.length > 8;
      } else {
        // Number like 123.456 - count all non-zero digits
        const allDigits = (intPart + decPart).replace(/^0+/, '');
        return allDigits.length > 8;
      }
    } else {
      // Integer - count digits, removing leading zeros
      const digits = cleanStr.replace(/^0+/, '') || '0';
      return digits.length > 8;
    }
  };
  
  // Check if the decimal has more precision than what we can show at max level
  const hasMorePrecision = (): boolean => {
    if (!enablePrecisionRotation() || precisionLevel !== 3) return false;
    
    // Get the full string representation
    const fullStr = decimal.toString();
    
    // Handle zero case
    if (decimal.isZero()) return false;
    
    // Remove sign and scientific notation for counting
    let cleanStr = fullStr.replace(/^-/, ''); // Remove negative sign
    
    // Handle scientific notation
    if (cleanStr.includes('e') || cleanStr.includes('E')) {
      // For scientific notation, count digits in the mantissa
      const mantissaPart = cleanStr.split(/[eE]/)[0];
      const digits = mantissaPart.replace(/[^0-9]/g, '');
      return digits.length > 36;
    }
    
    // For regular notation, count significant digits
    if (cleanStr.includes('.')) {
      // Has decimal point
      const [intPart, decPart] = cleanStr.split('.');
      
      if (intPart === '0' || intPart === '') {
        // Number like 0.001234 - count digits after leading zeros in decimal part
        const decDigits = decPart.replace(/^0+/, ''); // Remove leading zeros after decimal
        return decDigits.length > 36;
      } else {
        // Number like 123.456 - count all non-zero digits
        const allDigits = (intPart + decPart).replace(/^0+/, '');
        return allDigits.length > 36;
      }
    } else {
      // Integer - count digits, removing leading zeros
      const digits = cleanStr.replace(/^0+/, '') || '0';
      return digits.length > 36;
    }
  };
  
  const formatNumber = (num: Decimal, sigFigs: number): string | React.JSX.Element => {
    // Handle zero
    if (num.isZero()) return '0';
    
    // Calculate the exponent to determine if we need scientific notation
    const absNum = num.abs();
    const log10 = absNum.log(10);
    const exponent = Math.floor(log10.toNumber());
    
    // Use scientific notation only if abs(exponent) > 3
    if (Math.abs(exponent) > 3) {
      return formatScientific(num, sigFigs);
    }
    
    // For numbers where abs(exponent) <= 3, show in regular form
    // but limit to sigFigs significant digits
    if (sigFigs === 3) {
      // For the initial precision level, try to show exact representation if reasonable
      const str = num.toString();
      const digits = str.replace(/[^0-9]/g, '');
      const hasDecimal = str.includes('.');
      const leadingZeros = str.match(/^0*\.0*/)?.[0]?.replace(/\./g, '').length || 0;
      const significantDigits = digits.length - (hasDecimal && leadingZeros > 0 ? leadingZeros : 0);
      
      // If can be represented exactly with ≤9 digits and no scientific notation needed
      if (significantDigits <= 9 && !str.includes('e') && !str.includes('E')) {
        const result = str;
        return hasMorePrecision() ? result + '...' : result;
      }
    }
    
    // For higher precision levels or when exact representation is too long,
    // format to specified significant figures in regular notation
    const result = num.toSignificantDigits(sigFigs).toString();
    return hasMorePrecision() ? result + '...' : result;
  };
  
  const formatScientific = (num: Decimal, sigFigs: number): React.JSX.Element => {
    if (num.isZero()) return <span>0</span>;
    
    const sign = num.isNegative() ? '-' : '';
    const absNum = num.abs();
    
    // Calculate the exponent
    const log10 = absNum.log(10);
    const exponent = Math.floor(log10.toNumber());
    
    // Calculate the mantissa
    const mantissa = absNum.div(Decimal.pow(10, exponent));
    
    // Format mantissa to specified significant figures
    let mantissaStr;
    if (sigFigs === 1) {
      mantissaStr = mantissa.toFixed(0);
    } else {
      mantissaStr = mantissa.toFixed(sigFigs - 1);
      // Remove trailing zeros after decimal point
      mantissaStr = mantissaStr.replace(/\.?0+$/, '');
    }
    
    // Add "..." if we have more precision at max level
    if (hasMorePrecision()) {
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
  
  const getSigFigs = (level: number): number => {
    switch (level) {
      case 0: return 3;
      case 1: return 9;
      case 2: return 18;
      case 3: return 36;
      default: return 3;
    }
  };

  const handleClick = () => {
    if (enablePrecisionRotation()) {
      setPrecisionLevel((prev) => (prev + 1) % 4);
    }
  };
  
  const formattedValue = formatNumber(decimal, getSigFigs(precisionLevel));
  
  // Create dynamic class names based on precision rotation capability
  const baseClasses = `transition-colors duration-150 rounded px-1`;
  const interactiveClasses = enablePrecisionRotation() 
    ? `cursor-pointer hover:bg-blue-50 hover:text-blue-700 numeric-rotatable` 
    : `numeric-static`;
  
  const title = enablePrecisionRotation() 
    ? `Click to cycle precision (current: ${getSigFigs(precisionLevel)} sig figs). Full value: ${decimal.toString()}`
    : `Numeric value: ${decimal.toString()}`;

  return (
    <span 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={handleClick}
      title={title}
    >
      {formattedValue}
    </span>
  );
};

export default NumericText; 