import Decimal from 'decimal.js';
import { CONSTANTS } from './constants.constant';
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

  // Split the expression into left and right parts if it's an assignment
  const [leftPart, rightPart] = expression.split('=').map(part => part.trim());
  const isAssignment = rightPart !== undefined;

  // First pass: Extract @VARNAME patterns
  const varPattern = /@[a-zA-Z0-9_]+/g;
  currentExpression = currentExpression.replace(varPattern, (match) => {
    const varName = match.substring(1); // Remove @ prefix

    // If this is the left side of an assignment, just create a placeholder
    if (isAssignment && match === leftPart) {
      tokenValues.push(new Decimal(0));
      return `VAR${tokenValues.length - 1}`;
    }

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
  const numberPattern = /(^|[\s+\-*/^=,()])(-?\d*\.?\d+([eE][-+]?\d+)?)/g;
  currentExpression = currentExpression.replace(numberPattern, (match, prefix, number) => {
    tokenValues.push(new Decimal(number));
    return `${prefix}VAR${tokenValues.length - 1}`;
  });

  // Third pass: Extract built-in constants
  const constantPattern = /\b(PI|E|PHI|EULER_MASCHERONI|CONWAY_CONSTANT|KAPREKAR_CONSTANT|SPEED_OF_LIGHT|PLANCK_CONSTANT|GRAVITATIONAL_CONSTANT|BOLTZMANN_CONSTANT|SQRT2|SQRT3|SQRT5)\b/g;
  currentExpression = currentExpression.replace(constantPattern, (match) => {
    const constant = CONSTANTS[match];
    if (constant === undefined) {
      throw new Error(`Unknown constant: ${match}`);
    }
    // The proxy ensures constant is a Decimal
    tokenValues.push(constant as unknown as Decimal);
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

interface Assignment {
  type: 'Assignment';
  left: Variable;
  right: ASTNode;
}

interface FunctionCall {
  type: 'FunctionCall';
  name: string;
  arguments: ASTNode[];
}

type ASTNode = BinaryExpression | Literal | Variable | Assignment | FunctionCall;

// Simple recursive descent parser
class Parser {
  private tokens: string[];
  private current: number = 0;

  constructor(expression: string) {
    // Tokenize the expression
    // Convert ^ to special token for exponentiation
    expression = expression.replace(/\^/g, ' ^ ');
    this.tokens = expression
      .replace(/([+\-*/()^=,])/g, ' $1 ')
      .trim()
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  parse(): ASTNode {
    return this.parseAssignment();
  }

  private parseAssignment(): ASTNode {
    const left = this.parseExpression();

    if (this.current < this.tokens.length && this.tokens[this.current] === '=') {
      if (left.type !== 'Variable') {
        throw new Error('Left side of assignment must be a variable');
      }
      this.current++; // consume '='
      const right = this.parseAssignment();
      return {
        type: 'Assignment',
        left,
        right
      };
    }

    return left;
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

    if (token.startsWith('VAR')) {
      this.current++;
      return {
        type: 'Variable',
        name: token
      };
    }

    // Handle function calls
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      const funcName = token;
      this.current++;

      if (this.current >= this.tokens.length || this.tokens[this.current] !== '(') {
        return {
          type: 'Literal',
          value: funcName
        };
      }

      this.current++; // consume '('
      const args: ASTNode[] = [];

      if (this.current < this.tokens.length && this.tokens[this.current] !== ')') {
        while (true) {
          args.push(this.parseExpression());
          if (this.current >= this.tokens.length) {
            throw new Error('Expected closing parenthesis');
          }
          if (this.tokens[this.current] === ')') {
            break;
          }
          if (this.tokens[this.current] !== ',') {
            throw new Error('Expected comma or closing parenthesis');
          }
          this.current++;
        }
      }

      this.current++; // consume ')'
      return {
        type: 'FunctionCall',
        name: funcName,
        arguments: args
      };
    }

    this.current++;
    return {
      type: 'Literal',
      value: token
    };
  }
}

// Step 3: AST evaluation with high precision numbers
const evaluateAST = (node: ASTNode, tokenValues: Decimal[], builtInFunctions: Record<string, Function>): Decimal => {
  switch (node.type) {
    case 'BinaryExpression': {
      const left = evaluateAST(node.left, tokenValues, builtInFunctions);
      const right = evaluateAST(node.right, tokenValues, builtInFunctions);

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
    case 'FunctionCall': {
      const func = builtInFunctions[node.name];
      if (!func) {
        throw new Error(`Unknown function: ${node.name}`);
      }
      const args = node.arguments.map(arg => evaluateAST(arg, tokenValues, builtInFunctions));
      const result = func(...args);
      if (result instanceof Decimal) {
        return result;
      }
      return new Decimal(result.toString());
    }
    case 'Assignment':
      throw new Error('Assignment nodes should be handled by the caller');
    default:
      throw new Error(`Unknown node type: ${(node as ASTNode).type}`);
  }
};

export function evaluateExpression(expr: string, vars: AugmentedScriptVars, builtInFunctions: Record<string, Function> = {}): Decimal {
  // Step 1: Extract and map tokens
  const { mappedExpression, tokenValues, originalExpression } = extractAndMapTokens(expr, vars);

  // Step 2: Parse into AST
  const parser = new Parser(mappedExpression);
  const ast = parser.parse();

  // Step 3: Evaluate AST with high precision numbers
  if (ast.type === 'Assignment') {
    const result = evaluateAST(ast.right, tokenValues, builtInFunctions);
    // Get the original variable name from the expression
    const varName = originalExpression.split('=')[0].trim().substring(1); // Remove @ prefix
    vars[varName] = result;
    return result;
  }

  return evaluateAST(ast, tokenValues, builtInFunctions);
} 