import React, { useState } from 'react';
import Decimal from 'decimal.js';
import type { NumericTextProps, PrecisionLevel } from './numeric-text.types';
import { enablePrecisionRotation, getSigFigs } from './numeric-text.utils';
import { formatNumber } from './numeric-text.formatter';

const NumericText: React.FC<NumericTextProps> = ({ value, className = '' }) => {
  const [precisionLevel, setPrecisionLevel] = useState<PrecisionLevel>(1);
  const decimal = value instanceof Decimal ? value : new Decimal(value);
  
  const handleClick = () => {
    if (enablePrecisionRotation(decimal)) {
      setPrecisionLevel((prev) => ((prev % 3) + 1) as PrecisionLevel);
    }
  };
  
  const formattedValue = formatNumber(decimal, getSigFigs(precisionLevel), precisionLevel);
  
  const baseClasses = `transition-colors duration-150 rounded px-1`;
  const interactiveClasses = enablePrecisionRotation(decimal)
    ? `cursor-pointer hover:bg-blue-50 hover:text-blue-700 numeric-rotatable`
    : `numeric-static`;
  
  const title = enablePrecisionRotation(decimal)
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