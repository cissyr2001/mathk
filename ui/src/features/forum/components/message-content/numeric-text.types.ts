import Decimal from 'decimal.js';

export interface NumericTextProps {
  value: Decimal | number;
  className?: string;
}

export type PrecisionLevel = 1 | 2 | 3; 