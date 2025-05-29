import Decimal from 'decimal.js';
import { PREDEFINED_CONSTANTS } from './constants';
import type { AugmentedScriptVars } from './types';

// Step 1: Token extraction and variable mapping
interface TokenMapping {
  originalExpression: string;
  mappedExpression: string;
  tokenValues: Decimal[];
}

/**
 * Converts an array to a string representation
 */
function arrayToString(arr: any[]): string {
  const elements = arr.map(element => {
    if (element instanceof Decimal) return element.toString();
    if (typeof element === 'string') return element;
    if (Array.isArray(element)) return arrayToString(element);
    return String(element);
  });
  return `[${elements.join(', ')}]`;
}

function extractAndMapTokens(expression: string, vars: AugmentedScriptVars): TokenMapping {
  const tokenValues: Decimal[] = [];
  let currentExpression = expression;
  
  // First pass: Extract @VARNAME patterns
  const varPattern = /@[a-zA-Z0-9_]+/g;
  currentExpression = currentExpression.replace(varPattern, (match) => {
    const varName = match.substring(1); // Remove @ prefix
    const value = vars[varName];
    if (value === undefined) {
      throw new Error(`Undefined variable: ${varName}`);
    }
    
    if (value instanceof Decimal) {
      tokenValues.push(value);
    } else if (Array.isArray(value)) {
      // Arrays can't be used in mathematical expressions
      throw new Error(`Variable ${varName} is an array and cannot be used in mathematical expressions. Arrays: ${arrayToString(value)}`);
    } else {
      // Convert string values to Decimal if possible
      try {
        tokenValues.push(new Decimal(value.toString()));
      } catch (e) {
        throw new Error(`Variable ${varName} cannot be converted to number: ${value}`);
      }
    }
    return `VAR${tokenValues.length - 1}`;
  });

  // Second pass: Extract numeric literals
  const numberPattern = /\b\d*\.?\d+([eE][-+]?\d+)?\b/g;
  currentExpression = currentExpression.replace(numberPattern, (match) => {
    tokenValues.push(new Decimal(match));
    return `VAR${tokenValues.length - 1}`;
  });

  // Third pass: Extract built-in constants
  const constantPattern = /\b(PI|E|SQRT2)\b/g;
  currentExpression = currentExpression.replace(constantPattern, (match) => {
    const constant = PREDEFINED_CONSTANTS[match];
    if (!constant) {
      throw new Error(`Unknown constant: ${match}`);
    }
    tokenValues.push(constant);
    return `VAR${tokenValues.length - 1}`;
  });

  return {
    originalExpression: expression,
    mappedExpression: currentExpression,
    tokenValues
  };
}

// Step 2: AST Node types
interface BinaryExpression {
  type: 'BinaryExpression';
  operator: string;
  left: ASTNode;
  right: ASTNode;
}

interface Literal {
  type: 'Literal';
  value: string;
}

interface Variable {
  type: 'Variable';
  name: string;
}

type ASTNode = BinaryExpression | Literal | Variable;

// Simple recursive descent parser
class Parser {
  private tokens: string[];
  private current: number = 0;

  constructor(expression: string) {
    // Tokenize the expression
    // Convert ^ to special token for exponentiation
    expression = expression.replace(/\^/g, ' ^ ');
    this.tokens = expression
      .replace(/([+\-*/()^])/g, ' $1 ')
      .trim()
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  parse(): ASTNode {
    return this.parseExpression();
  }

  private parseExpression(): ASTNode {
    let left = this.parseTerm();

    while (this.current < this.tokens.length) {
      const token = this.tokens[this.current];
      if (token !== '+' && token !== '-') break;

      this.current++;
      const right = this.parseTerm();
      left = {
        type: 'BinaryExpression',
        operator: token,
        left,
        right
      };
    }

    return left;
  }

  private parseTerm(): ASTNode {
    let left = this.parseFactor();

    while (this.current < this.tokens.length) {
      const token = this.tokens[this.current];
      if (token !== '*' && token !== '/') break;

      this.current++;
      const right = this.parseFactor();
      left = {
        type: 'BinaryExpression',
        operator: token,
        left,
        right
      };
    }

    return left;
  }

  private parseFactor(): ASTNode {
    let left = this.parsePrimary();

    while (this.current < this.tokens.length) {
      const token = this.tokens[this.current];
      if (token !== '^') break;

      this.current++;
      const right = this.parsePrimary();
      left = {
        type: 'BinaryExpression',
        operator: token,
        left,
        right
      };
    }

    return left;
  }

  private parsePrimary(): ASTNode {
    const token = this.tokens[this.current];

    if (token === '(') {
      this.current++;
      const node = this.parseExpression();
      
      if (this.current >= this.tokens.length || this.tokens[this.current] !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      this.current++;
      return node;
    }

    this.current++;
    if (token.startsWith('VAR')) {
      return {
        type: 'Variable',
        name: token
      };
    }

    return {
      type: 'Literal',
      value: token
    };
  }
}

// Step 3: AST evaluation with high precision numbers
const evaluateAST = (node: ASTNode, tokenValues: Decimal[]): Decimal => {
  switch (node.type) {
    case 'BinaryExpression': {
      const left = evaluateAST(node.left, tokenValues);
      const right = evaluateAST(node.right, tokenValues);
      
      switch (node.operator) {
        case '+': return left.plus(right);
        case '-': return left.minus(right);
        case '*': return left.times(right);
        case '/': return left.dividedBy(right);
        case '^': return left.pow(right);
        default:
          throw new Error(`Unknown operator: ${node.operator}`);
      }
    }
    case 'Variable': {
      const index = parseInt(node.name.substring(3));
      if (isNaN(index) || index >= tokenValues.length) {
        throw new Error(`Invalid variable reference: ${node.name}`);
      }
      return tokenValues[index];
    }
    case 'Literal':
      return new Decimal(node.value);
    default:
      throw new Error(`Unknown node type: ${(node as ASTNode).type}`);
  }
};

export function evaluateExpression(expr: string, vars: AugmentedScriptVars): Decimal {
  // Step 1: Extract and map tokens
  const { mappedExpression, tokenValues } = extractAndMapTokens(expr, vars);
  
  // Step 2: Parse into AST
  const parser = new Parser(mappedExpression);
  const ast = parser.parse();
  
  // Step 3: Evaluate AST with high precision numbers
  return evaluateAST(ast, tokenValues);
} 